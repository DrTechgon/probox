'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  MoreVertical,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getChatHistory,
  saveChatHistory,
  clearChatHistory,
  generateMessageId,
  sendMessage,
  welcomeMessage
} from '@/lib/chat-service';

// Page-specific conversation starters
const conversationStartersByPage = {
  '/': [
    "What services does PROBOX offer?",
    "How can PROBOX help my business?",
    "Tell me about your expertise"
  ],
  '/services': [
    "Which service is best for startups?",
    "Do you offer cloud solutions?",
    "Tell me about your AI services"
  ],
  '/about': [
    "What's PROBOX's mission?",
    "How experienced is your team?",
    "Where are your offices located?"
  ],
  '/careers': [
    "What positions are open?",
    "What's the hiring process like?",
    "What benefits do you offer?"
  ],
  '/careers/[id]': [
    "What skills are required?",
    "Is remote work available?",
    "How do I apply for this role?"
  ],
  '/contact': [
    "What's the best way to reach you?",
    "How quickly do you respond?",
    "Can I schedule a consultation?"
  ],
  '/case-studies': [
    "What industries do you work with?",
    "Can you share success stories?",
    "What results have clients seen?"
  ],
  'default': [
    "Tell me about PROBOX",
    "What services do you offer?",
    "How can I get started?"
  ]
};

// Get conversation starters based on current path
const getConversationStarters = (pathname) => {
  // Check for exact match first
  if (conversationStartersByPage[pathname]) {
    return conversationStartersByPage[pathname];
  }
  
  // Check for dynamic routes (e.g., /careers/[id], /services/[id])
  if (pathname.startsWith('/careers/') && pathname !== '/careers') {
    return conversationStartersByPage['/careers/[id]'];
  }
  if (pathname.startsWith('/services/') && pathname !== '/services') {
    return [
      "Tell me more about this service",
      "What's the pricing for this?",
      "How do I get started?"
    ];
  }
  
  // Return default starters
  return conversationStartersByPage['default'];
};

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex items-center gap-1.5 bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
        <motion.div
          className="w-2 h-2 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-2 h-2 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
        />
        <motion.div
          className="w-2 h-2 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
        />
      </div>
    </div>
  );
}

// Code block component with copy button
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-2">
      <pre className={`bg-slate-800 text-slate-100 rounded-lg p-3 text-sm overflow-x-auto ${className || ''}`}>
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-slate-700 hover:bg-slate-600 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} className="text-slate-300" />
        )}
      </button>
    </div>
  );
}

// Message bubble component
function ChatMessage({ message, onCopy }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const isError = message.error;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 py-1.5`}
    >
      <div className={`group relative max-w-[85%] ${isUser ? 'order-1' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isUser
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-br-md'
              : isError
              ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-md'
              : 'bg-slate-100 text-slate-800 rounded-bl-md'
          }`}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : isError ? (
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{message.content}</span>
            </div>
          ) : (
            <div className="text-sm prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-a:text-teal-600">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    if (inline) {
                      return (
                        <code className="bg-slate-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return <CodeBlock className={className}>{children}</CodeBlock>;
                  },
                  a: ({ node, children, href, ...props }) => (
                    <a href={href} className="text-teal-600 hover:text-teal-700 underline" {...props}>
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Copy button for assistant messages */}
        {!isUser && !isError && message.content.length > 100 && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-6 left-2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Copy message"
          >
            {copied ? (
              <>
                <Check size={12} />
                Copied
              </>
            ) : (
              <>
                <Copy size={12} />
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Suggestion chip component (inside chat)
function SuggestionChip({ text, onClick }) {
  return (
    <button
      onClick={() => onClick(text)}
      className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-full text-slate-600 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 transition-colors whitespace-nowrap"
    >
      {text}
    </button>
  );
}

// Conversation Starter Bubble (floating above chat button)
function ConversationStarterBubble({ text, onClick, index, total }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      onClick={() => onClick(text)}
      className="group flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg border border-slate-100 hover:border-teal-300 hover:shadow-xl transition-all duration-200 max-w-[280px]"
      whileHover={{ scale: 1.02, x: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Sparkles size={14} className="text-teal-500 flex-shrink-0" />
      <span className="text-sm text-slate-700 group-hover:text-teal-600 transition-colors truncate">
        {text}
      </span>
    </motion.button>
  );
}

// Main ChatWidget component
export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Get page-specific conversation starters
  const conversationStarters = getConversationStarters(pathname);

  // Load chat history on mount
  useEffect(() => {
    const history = getChatHistory();
    if (history.length > 0) {
      setMessages(history);
      setHasInteracted(true);
    }
    setIsInitialized(true);
  }, []);

  // Save chat history when messages change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, isInitialized]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!userHasScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, userHasScrolled]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Show conversation starters after a delay on page change
  useEffect(() => {
    if (!isOpen && !hasInteracted) {
      setShowStarters(false);
      const timer = setTimeout(() => {
        setShowStarters(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pathname, isOpen, hasInteracted]);

  // Handle scroll events
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setUserHasScrolled(!isAtBottom);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message handler
  const handleSendMessage = async (content = inputValue) => {
    if (!content.trim() || isLoading) return;

    setHasInteracted(true);
    setShowStarters(false);

    const userMessage = {
      id: generateMessageId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setUserHasScrolled(false);

    // Open chat if sending from starter bubble
    if (!isOpen) {
      setIsOpen(true);
    }

    try {
      const response = await sendMessage(content, messages);
      
      setMessages(prev => [...prev, {
        id: response.id || generateMessageId(),
        role: 'assistant',
        content: response.content,
        timestamp: response.timestamp || new Date().toISOString()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear conversation handler
  const handleClearConversation = () => {
    setMessages([]);
    clearChatHistory();
    setHasInteracted(false);
    setShowStarters(true);
  };

  // Toggle chat panel
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUserHasScrolled(false);
    }
  };

  // Handle starter click
  const handleStarterClick = (text) => {
    setIsOpen(true);
    setTimeout(() => {
      handleSendMessage(text);
    }, 300);
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* Conversation Starter Bubbles - shown when chat is closed */}
      <AnimatePresence>
        {!isOpen && showStarters && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2"
          >
            {conversationStarters.map((starter, index) => (
              <ConversationStarterBubble
                key={`${pathname}-${index}`}
                text={starter}
                onClick={handleStarterClick}
                index={index}
                total={conversationStarters.length}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-slate-700 hover:bg-slate-800' 
            : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="text-white" size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="text-white" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={toggleChat}
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed z-50 bg-white shadow-2xl flex flex-col
                bottom-0 right-0 left-0 top-0
                md:bottom-24 md:right-6 md:left-auto md:top-auto
                md:w-[400px] md:h-[600px] md:max-h-[80vh]
                md:rounded-2xl overflow-hidden"
              role="dialog"
              aria-label="Chat with assistant"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">PROBOX Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-slate-500">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Chat options">
                        <MoreVertical size={18} className="text-slate-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleClearConversation}>
                        <Trash2 size={16} className="mr-2" />
                        Clear conversation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.location.reload()}>
                        <RefreshCw size={16} className="mr-2" />
                        Refresh
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 md:hidden" 
                    onClick={toggleChat}
                    aria-label="Close chat"
                  >
                    <X size={18} className="text-slate-500" />
                  </Button>
                </div>
              </div>

              {/* Messages container */}
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto py-4 bg-gradient-to-b from-slate-50 to-white"
              >
                {/* Welcome message / empty state */}
                {showWelcome && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-6"
                  >
                    <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 mb-4">
                      <p className="text-sm text-slate-700">{welcomeMessage.content}</p>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Quick questions for this page:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {conversationStarters.map((prompt, idx) => (
                        <SuggestionChip
                          key={idx}
                          text={prompt}
                          onClick={handleSendMessage}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Message list */}
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isLoading && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input footer */}
              <div className="p-3 border-t border-slate-100 bg-white">
                <div className="flex items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 flex-shrink-0 text-slate-400 hover:text-slate-600"
                    aria-label="Attach file (coming soon)"
                    disabled
                  >
                    <Paperclip size={20} />
                  </Button>
                  <Textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="min-h-[44px] max-h-[120px] resize-none bg-slate-50 border-slate-200 focus:bg-white rounded-xl text-sm"
                    rows={1}
                    aria-label="Chat message input"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className="h-10 w-10 flex-shrink-0 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-slate-400 text-center mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
