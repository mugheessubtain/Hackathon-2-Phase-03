"""
AI Service for Google Gemini (Direct) + MCP tools
Handles task management with robust JSON parsing and fallback.
Uses Google's OpenAI-compatible endpoint.
"""

import os
import json
import re
from typing import Dict, Any, List, Optional
from uuid import UUID

from dotenv import load_dotenv
from openai import AsyncOpenAI
from app.services.mcp_tool_wrappers import get_mcp_tools_wrapper, TOOLS_DEFINITIONS

load_dotenv()


def safe_uuid(val: Optional[str]) -> Optional[UUID]:
    """Convert string to UUID safely"""
    if val is None:
        return None
    try:
        return UUID(val)
    except ValueError:
        return val  # leave as-is if invalid


class AIService:
    def __init__(self):
        # Default to Gemini 2.0 Flash (Direct)
        env_model = os.getenv("AI_MODEL", "gemini-2.0-flash")
        
        # Force Gemini if a stale or incorrect model name is provided in environment
        if "mistral" in env_model.lower() or "devstral" in env_model.lower():
            self.model_name = "gemini-2.0-flash"
        else:
            self.model_name = env_model

        self.api_key = os.getenv("GEMINI_API_KEY")

        if not self.api_key:
            print("⚠️ GEMINI_API_KEY not set. AI functionality will not work.")
            self.client = None
        else:
            # Use Google's OpenAI-compatible endpoint
            self.client = AsyncOpenAI(
                api_key=self.api_key,
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
            )

    def _system_prompt(self) -> str:
        return f"""
You are a strict task management AI assistant.
You help users manage their todo list by using the provided tools.

TOOLS:
{json.dumps(TOOLS_DEFINITIONS, indent=2)}

RULES:
- If you need to perform an action (add, list, update, complete, delete), respond ONLY with a valid JSON object.
- JSON Format for tool calls:
{{
  "tool_name": "<name_of_the_tool>",
  "arguments": {{ ... }}
}}
- Do NOT include 'user_id' in the arguments; it will be injected automatically.
- If no action is needed, respond with a helpful, concise plain text message.
- Always be polite and confirm the user's request.
"""

    def _detect_ambiguous_request(self, msg: str) -> bool:
        """Detect vague requests that need clarification"""
        ambiguous = ["it", "that", "the task", "that one", "first one", "last one",
                     "mentioned", "above", "previous", "next", "another", "more",
                     "do it", "handle this", "take care of", "manage this"]
        msg = msg.lower()
        return any(word in msg for word in ambiguous)

    async def process_natural_language_request(
        self,
        user_message: str,
        user_id: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        db_session=None
    ) -> Dict[str, Any]:

        if not self.client:
            return {
                "response": "⚠️ AI service not configured. Please check your GEMINI_API_KEY.",
                "tool_calls": [],
                "task_updates": []
            }

        wrapper = get_mcp_tools_wrapper(db_session)
        response_payload = {"response": "", "tool_calls": [], "task_updates": []}

        if self._detect_ambiguous_request(user_message):
            return {"response": "Could you please specify which task you're referring to?", **response_payload}

        # Build message context
        messages = [{"role": "system", "content": self._system_prompt()}]
        if conversation_history:
            for msg in conversation_history:
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
        messages.append({"role": "user", "content": user_message})

        try:
            # Call Google Gemini via OpenAI-compatible endpoint
            resp = await self.client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                temperature=0.3
            )

            text = ""
            if resp.choices:
                text = resp.choices[0].message.content or ""
            text = text.strip()

            if not text:
                return {"response": "I'm sorry, I couldn't generate a response. Please try again.", **response_payload}

            # Attempt to parse JSON for tool use
            json_match = re.search(r'\{.*\}', text, re.DOTALL)
            if json_match:
                try:
                    parsed = json.loads(json_match.group())
                    if isinstance(parsed, dict) and "tool_name" in parsed:
                        tool_name = parsed["tool_name"]
                        arguments = parsed.get("arguments", {})

                        # Auto-inject user_id
                        if tool_name in ["create_task", "get_tasks", "find_task_by_title"] and "user_id" not in arguments:
                            arguments["user_id"] = user_id
                        
                        # Sanitize UUIDs
                        for k in ["user_id", "task_id"]:
                            if k in arguments:
                                arguments[k] = str(safe_uuid(arguments[k]))

                        # Execute the tool
                        if hasattr(wrapper, tool_name):
                            data = await getattr(wrapper, tool_name)(**arguments)
                            
                            response_payload["tool_calls"].append({
                                "name": tool_name,
                                "arguments": arguments,
                                "response": data
                            })
                            
                            # Standardize task updates for the UI
                            action_name = tool_name.replace("_task", "").replace("task_", "")
                            update_info = {"action": action_name}
                            if isinstance(data, list):
                                update_info["tasks"] = data
                            else:
                                update_info["task"] = data
                            response_payload["task_updates"].append(update_info)

                            # Friendly confirmation messages
                            if "create" in tool_name:
                                response_payload["response"] = "✅ I've added that task for you!"
                            elif "delete" in tool_name:
                                response_payload["response"] = "🗑️ Task deleted successfully."
                            elif "complete" in tool_name:
                                response_payload["response"] = "✅ Great job! I've marked that task as completed."
                            elif "update" in tool_name:
                                response_payload["response"] = "✏️ Task updated successfully."
                            elif "get" in tool_name:
                                if isinstance(data, list) and not data:
                                    response_payload["response"] = "📋 Your task list is currently empty."
                                else:
                                    response_payload["response"] = "📋 Here are the tasks I found:"
                            else:
                                response_payload["response"] = f"Successfully executed {action_name}."
                            
                            return response_payload
                except (json.JSONDecodeError, Exception):
                    pass # Fall back to text response if JSON fails

            # Fallback for simple task addition if AI didn't use JSON but intended to add a task
            user_lower = user_message.lower()
            if any(k in user_lower for k in ["add task", "create task", "new task"]):
                title_match = re.search(r'(?:add|create|new)\s+(?:a\s+)?(?:task|todo)\s+(?:for\s+|to\s+|)(.+)', user_lower, re.IGNORECASE)
                if title_match:
                    title = title_match.group(1).strip().split(".")[0]
                    data = await wrapper.create_task(title=title.title(), user_id=user_id)
                    response_payload["tool_calls"].append({
                        "name": "create_task",
                        "arguments": {"title": title.title(), "user_id": user_id},
                        "response": data
                    })
                    response_payload["task_updates"].append({"action": "create", "task": data})
                    response_payload["response"] = "✅ Task added successfully!"
                    return response_payload

            # Default: Return the AI's text response
            response_payload["response"] = text
            return response_payload

        except Exception as e:
            return {
                "response": f"⚠️ Error: {str(e)}",
                "tool_calls": [],
                "task_updates": []
            }

# Singleton instance
_ai_service_instance = None

def get_ai_service() -> AIService:
    global _ai_service_instance
    if _ai_service_instance is None:
        _ai_service_instance = AIService()
    return _ai_service_instance
