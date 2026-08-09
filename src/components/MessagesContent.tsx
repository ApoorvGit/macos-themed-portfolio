import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { getAIReply } from "../lib/groq-service";

interface Message {
  id: string;
  text: string;
  sender: "user" | "apoorv";
  timestamp: Date;
}

export const MessagesContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [userId, setUserId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const saveMessages = useCallback((msgs: Message[], uid: string) => {
    localStorage.setItem(`messages_${uid}`, JSON.stringify(msgs));
  }, []);

  const loadMessages = useCallback(
    (uid: string) => {
      const storedMessages = localStorage.getItem(`messages_${uid}`);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map(
          (msg: Message & { timestamp: string }) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }),
        );
        setMessages(messagesWithDates);
      } else {
        // Initial welcome message
        const welcomeMessage: Message = {
          id: "welcome",
          text: "Hey! 👋 Thanks for checking out my portfolio. Feel free to send me a message!",
          sender: "apoorv",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        saveMessages([welcomeMessage], uid);
      }
    },
    [saveMessages],
  );

  useEffect(() => {
    // Get or create unique user ID
    let storedUserId = localStorage.getItem("portfolio_user_id");
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("portfolio_user_id", storedUserId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserId(storedUserId);
    } else if (userId !== storedUserId) {
      setUserId(storedUserId);
    }

    // Load messages for this user
    loadMessages(storedUserId);
  }, [loadMessages, userId, saveMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages, userId);
    setInputText("");

    // Get AI-powered reply from Groq
    try {
      // Show typing indicator
      setIsTyping(true);

      // Prepare conversation history for context
      const conversationHistory = updatedMessages.map((msg) => ({
        text: msg.text,
        sender: msg.sender,
      }));

      // Get AI response
      const aiReplyText = await getAIReply(
        newMessage.text,
        conversationHistory,
      );

      // Hide typing indicator
      setIsTyping(false);

      // Add AI reply to messages
      setTimeout(() => {
        const autoReply: Message = {
          id: `reply_${Date.now()}`,
          text: aiReplyText,
          sender: "apoorv",
          timestamp: new Date(),
        };
        const withReply = [...updatedMessages, autoReply];
        setMessages(withReply);
        saveMessages(withReply, userId);
      }, 1000); // Small delay to simulate typing
    } catch (error) {
      console.error("Error getting AI reply:", error);
      setIsTyping(false);
      // Fallback message if AI fails
      setTimeout(() => {
        const fallbackReply: Message = {
          id: `reply_${Date.now()}`,
          text: "Thanks for your message! I'm currently experiencing technical difficulties with my AI assistant. Please feel free to reach out to me directly at apoorvmishra1000@gmail.com or connect on LinkedIn! 😊",
          sender: "apoorv",
          timestamp: new Date(),
        };
        const withReply = [...updatedMessages, fallbackReply];
        setMessages(withReply);
        saveMessages(withReply, userId);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full h-full flex bg-white">
      {/* Sidebar - Contact List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
        </div>

        {/* Contact */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-3 bg-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-colors">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
              AM
            </div>
            {/* Contact Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900">
                Apoorv Mishra
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {messages.length > 1
                  ? messages[messages.length - 1].text
                  : "Start a conversation"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="px-6 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              AM
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Apoorv Mishra
              </h3>
              <p className="text-xs text-green-600">Available</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-end gap-2 max-w-[70%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar for Apoorv */}
                  {message.sender === "apoorv" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                      AM
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="flex flex-col">
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-gray-200 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      {message.sender === "user" ? (
                        // User messages: plain text
                        <p className="text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                      ) : (
                        // Apoorv messages: render markdown
                        <div className="text-sm leading-relaxed break-words prose prose-sm max-w-none prose-p:my-1 prose-code:text-xs prose-code:bg-gray-300 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                          <ReactMarkdown
                            components={{
                              // Customize markdown rendering
                              p: ({ children }) => (
                                <p className="my-1">{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              code: ({ children }) => (
                                <code className="bg-gray-300 px-1 py-0.5 rounded text-xs">
                                  {children}
                                </code>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside my-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside my-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="my-0.5">{children}</li>
                              ),
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[70%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                    AM
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-gray-200 rounded-bl-md">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-end gap-3">
            {/* Input Field */}
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="iMessage"
                rows={1}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{ maxHeight: "100px" }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inputText.trim()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          {/* Info text */}
          <p className="text-xs text-gray-500 mt-2 text-center">
            Your messages are saved locally on this device
          </p>
        </div>
      </div>
    </div>
  );
};
