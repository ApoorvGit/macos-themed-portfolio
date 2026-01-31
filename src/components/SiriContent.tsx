import React, { useState, useEffect, useRef, useCallback } from "react";
import { getAIReply } from "../lib/groq-service";

interface Message {
  text: string;
  sender: string;
  isUser: boolean;
  timestamp: Date;
}

interface SiriContentProps {
  onOpenApp?: (appId: string) => void;
}

export const SiriContent: React.FC<SiriContentProps> = ({ onOpenApp }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    // Initialize speech recognition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition: any =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).webkitSpeechRecognition as any);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleUserInput(transcriptText);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard listener for Space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        if (isListening) {
          stopListening();
        } else if (!isProcessing) {
          startListening();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, isProcessing]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setIsListening(true);
      recognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const handleUserInput = async (text: string) => {
    setIsListening(false);
    setTranscript("");

    // Add user message
    const userMessage: Message = {
      text,
      sender: "user",
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Check for app opening commands
    const lowerText = text.toLowerCase();
    const appCommands: { [key: string]: string[] } = {
      projects: ["open projects", "show projects", "projects"],
      experience: [
        "open experience",
        "show experience",
        "my experience",
        "experience",
      ],
      skills: ["open skills", "show skills", "my skills", "skills"],
      blog: ["open blog", "show blog", "blog"],
      gallery: ["open gallery", "show gallery", "gallery"],
      contact: ["open contact", "show contact", "contact"],
      facetime: ["open facetime", "start facetime", "facetime", "video call"],
      messages: ["open messages", "show messages", "messages", "chat"],
    };

    let appToOpen: string | null = null;
    for (const [appId, commands] of Object.entries(appCommands)) {
      if (commands.some((cmd) => lowerText.includes(cmd))) {
        appToOpen = appId;
        break;
      }
    }

    if (appToOpen && onOpenApp) {
      // Handle app opening command
      const appName = appToOpen.charAt(0).toUpperCase() + appToOpen.slice(1);
      const response = `Opening ${appName} for you.`;

      const assistantMessage: Message = {
        text: response,
        sender: "assistant",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      speak(response);

      // Open the app
      setTimeout(() => {
        onOpenApp(appToOpen!);
      }, 500);

      setIsProcessing(false);
      return;
    }

    try {
      // Get AI response
      const response = await getAIReply(
        text,
        messages.map((m) => ({ text: m.text, sender: m.sender })),
        true,
      );

      // Add assistant message
      const assistantMessage: Message = {
        text: response,
        sender: "assistant",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the response
      speak(response);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        text: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        sender: "assistant",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      speak(errorMessage.text);
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95; // Slightly slower for clearer delivery
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to use an Indian English voice
      const voices = synthRef.current.getVoices();
      const preferredVoice =
        voices.find(
          (voice) =>
            voice.lang === "en-IN" || // Indian English
            voice.name.includes("Indian") ||
            voice.name.includes("India") ||
            voice.name.includes("Rishi") || // Google's Indian voice
            voice.name.includes("Veena"), // Another common Indian voice
        ) ||
        voices.find(
          (voice) =>
            voice.lang === "en-GB" || // British English as fallback (closer to Indian accent)
            voice.name.includes("Google UK English"),
        ) ||
        voices.find(
          (voice) => voice.lang === "en-US", // US English as last resort
        );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      synthRef.current.speak(utterance);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 backdrop-blur-2xl flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent animate-pulse"></div>

      {/* Siri Orb */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Main Orb */}
        <div
          className={`relative transition-all duration-300 ${
            isListening || isProcessing ? "scale-110" : "scale-100"
          }`}
        >
          {/* Outer glow rings */}
          {(isListening || isProcessing) && (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-2xl animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 opacity-20 blur-3xl animate-pulse"></div>
            </>
          )}

          {/* Main orb button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isProcessing
                ? "bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 cursor-wait"
                : isListening
                  ? "bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 shadow-2xl shadow-purple-500/50"
                  : "bg-gradient-to-br from-purple-400/80 via-blue-400/80 to-pink-400/80 hover:from-purple-500 hover:via-blue-500 hover:to-pink-500 hover:shadow-xl hover:shadow-purple-400/30"
            }`}
          >
            {/* Animated waveform - Siri style */}
            {isListening && (
              <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                {[...Array(12)].map((_, i) => {
                  const heights = [
                    20, 35, 50, 60, 70, 75, 75, 70, 60, 50, 35, 20,
                  ];
                  const delays = [
                    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1,
                  ];
                  return (
                    <div
                      key={i}
                      className="w-1 bg-white rounded-full animate-siri-wave"
                      style={{
                        height: `${heights[i]}%`,
                        animationDelay: `${delays[i]}s`,
                        animationDuration: "1.2s",
                      }}
                    ></div>
                  );
                })}
              </div>
            )}

            {/* Icon */}
            {!isListening && !isProcessing && (
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}

            {/* Processing spinner */}
            {isProcessing && (
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            )}
          </button>
        </div>

        {/* Transcript or prompt */}
        <div className="min-h-[50px] max-w-sm mx-auto text-center px-4">
          {transcript && (
            <p className="text-white text-lg font-medium animate-pulse">
              "{transcript}"
            </p>
          )}
          {!transcript && !isListening && !isProcessing && (
            <p className="text-white/60 text-base">What can I help you with?</p>
          )}
          {isProcessing && (
            <p className="text-white/80 text-base animate-pulse">Thinking...</p>
          )}
        </div>

        {/* Recent messages */}
        {messages.length > 0 && (
          <div className="max-w-sm w-full max-h-48 overflow-y-auto space-y-2 px-4 custom-scrollbar">
            {messages.slice(-2).map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    msg.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                  }`}
                >
                  <p className="text-xs">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hint text */}
      <div className="absolute bottom-6 text-center px-4">
        <p className="text-white/40 text-xs">
          Ask about experience, projects, or skills
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        @keyframes siri-wave {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-siri-wave {
          animation: siri-wave 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
