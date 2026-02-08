# AI-Powered Todo Chatbot

This project implements an AI-powered chatbot on top of the Phase 2 full-stack Todo app, allowing users to manage their tasks using natural language commands. The system leverages Claude AI through the OpenAI-compatible API to interpret user requests and perform appropriate todo operations.

## Features

- **Natural Language Task Management**: Add, list, complete, delete, and update tasks using conversational commands
- **AI-Powered Conversations**: Intelligent responses that feel natural and helpful, with contextual understanding
- **Persistent Conversation History**: Maintains context across multiple sessions with conversation history preserved between visits
- **Seamless Full-Stack Integration**: Smooth interaction between frontend and backend with clear API contracts

## Core Principles

### I. AI-First Design
Every feature leverages AI capabilities as the primary interaction paradigm; Natural language processing is the default interface; All user interactions are designed with AI understanding in mind.

### II. Tool-Integrated Architecture
All functionality is exposed as MCP tools accessible to AI agents; Existing Phase 2 agents are wrapped as reusable tools; Tool contracts are consistent and well-documented.

### III. Statelessness (NON-NEGOTIABLE)
Server components maintain no session state; Each request is independent and self-contained; All state is persisted in the database and retrieved as needed.

### IV. Full-Stack Integration
Frontend and backend work seamlessly together; API contracts are clearly defined and maintained; Cross-platform consistency is required.

### V. Natural Language Processing
All user inputs are processed through NLP to extract intent; AI responses are human-friendly and contextual; Error handling is graceful with clear user feedback.

### VI. Database-Centric Storage
All data is stored in the shared database; Conversation history is persisted for continuity; Existing Phase 2 table structures are reused where possible.

## Project Structure

```
backend/                    # FastAPI backend with AI integration
├── app/                    # Application code
│   ├── auth/               # Authentication modules
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic and AI services
│   │   ├── ai_service.py   # AI integration service
│   │   ├── chat_service.py # Chat logic service
│   │   └── mcp_tool_wrappers.py # Tool wrappers for Phase 2 agents
│   ├── models.py           # Data models including chat models
│   └── main.py             # Application entry point
└── requirements.txt        # Python dependencies

frontend/                   # Next.js frontend
├── app/                    # App Router pages
│   ├── chat/               # Chat interface page
│   └── layout.tsx          # Root layout
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ChatInterface.jsx # Main chat interface
│   │   └── MessageList.jsx   # Message display component
│   └── services/           # API service layer
│       └── api.js          # API client
└── package.json            # Node.js dependencies

specs/                      # Feature specifications and plans
└── 001-todo-chatbot/       # Todo Chatbot feature
    ├── spec.md             # Feature specification
    ├── plan.md             # Implementation plan
    ├── tasks.md            # Implementation tasks
    ├── research.md         # Research findings
    ├── data-model.md       # Data model documentation
    ├── quickstart.md       # Quickstart guide
    └── contracts/          # API contracts
```

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Access to Claude API (Anthropic API key)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

4. Start the backend server:
   ```bash
   python main.py
   # or
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env.local file and add:
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser

## Usage

1. Log in to the application
2. Navigate to the Chat page
3. Interact with the AI assistant using natural language commands such as:
   - "Add buy groceries to my todo list"
   - "Show me my tasks"
   - "Mark task #1 as complete"
   - "Change task #2 to 'buy milk'"

## Development Workflow

1. Create a feature specification in `specs/[feature-name]/spec.md`
2. Generate an implementation plan with `/sp.plan`
3. Generate implementation tasks with `/sp.tasks`
4. Implement following the constitution principles
5. Test and validate compliance with constitution requirements
"# hakathon2-phase3" 
"# hakathon2-phase3" 
