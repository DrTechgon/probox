/**
 * Chat Service Layer
 * 
 * Abstraction for chatbot backend logic.
 * Currently uses rule-based responses.
 * 
 * TODO: Replace with real AI integration (OpenAI, Anthropic, etc.)
 * Example replacement:
 *   const response = await openai.chat.completions.create({
 *     model: 'gpt-4',
 *     messages: conversationHistory,
 *     stream: true
 *   });
 */

// Storage key for chat history
const CHAT_STORAGE_KEY = 'probox_chat_history';

/**
 * Get chat history from localStorage
 */
export const getChatHistory = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

/**
 * Save chat history to localStorage
 */
export const saveChatHistory = (messages) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

/**
 * Clear chat history from localStorage
 */
export const clearChatHistory = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};

/**
 * Generate a unique message ID
 */
export const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Send a message to the chat API
 * 
 * TODO: Replace with real AI API call
 * Example:
 *   const response = await fetch('/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ message, history, userId })
 *   });
 */
export const sendMessage = async (message, history = []) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.slice(-10), // Send last 10 messages for context
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from chatbot');
  }

  const data = await response.json();
  return data;
};

/**
 * Suggested prompts for empty state
 */
export const suggestedPrompts = [
  "What services do you offer?",
  "Tell me about career opportunities",
  "How can I contact your team?"
];

/**
 * Welcome message
 */
export const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! 👋 I'm your PROBOX assistant. I can help you learn about our services, career opportunities, or answer questions about our company. How can I help you today?",
  timestamp: new Date().toISOString()
};
