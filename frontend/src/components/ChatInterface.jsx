import { useState, useRef, useEffect } from 'react';
import ApiService from '../services/api';

const ChatInterface = ({ userId }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      content: "👋 Hello! I'm your AI task assistant. I can help you create, update, complete, or delete tasks. Just ask me anything!", 
      timestamp: new Date() 
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await ApiService.sendMessage(userId, userMessage.content, conversationId);

      if (response.conversation_id && !conversationId) {
        setConversationId(response.conversation_id);
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: response.response,
        toolCalls: response.tool_calls,
        taskUpdates: response.task_updates,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Dispatch event if there are task updates
      if (response.task_updates && response.task_updates.length > 0) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('task-updated'));
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickActions = [
    { label: "Show all tasks", icon: "📋" },
    { label: "Create a task", icon: "✨" },
    { label: "Complete tasks", icon: "✅" },
    { label: "What's pending?", icon: "⏱️" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Avatar */}
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 mb-2 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              )}
              
              {/* Message Bubble */}
              <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.content}</p>

                {/* Task Updates Badge */}
                {msg.sender === 'ai' && msg.taskUpdates && msg.taskUpdates.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                    {msg.taskUpdates.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-700 capitalize">{t.action || 'Updated'}:</span>
                          <span className="text-gray-600 ml-1">
                            {t.task?.title || (t.tasks ? `${t.tasks.length} tasks` : 'Task')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                <span className={`text-[10px] mt-2 block ${
                  msg.sender === 'user' ? 'text-violet-100' : 'text-gray-400'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-xs text-gray-500">AI is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Quick Actions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => setInputValue(action.label)}
                className="text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 text-xs font-medium text-gray-700 flex items-center gap-2"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me to manage your tasks..."
            className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 resize-none bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
            disabled={isLoading}
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <button
            type="submit"
            className={`px-5 py-3 rounded-xl text-white font-semibold transition-all duration-200 flex-shrink-0 ${
              isLoading || !inputValue.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg hover:scale-105 shadow-violet-500/30'
            }`}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;