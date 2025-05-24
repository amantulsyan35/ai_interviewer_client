import { Bot, User } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface InterviewMessageProps {
  message: Message;
}

export function InterviewMessage({ message }: InterviewMessageProps) {
  const isAI = message.type === "ai";

  return (
    <div
      className={cn(
        "flex items-start space-x-3",
        !isAI && "flex-row-reverse space-x-reverse",
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isAI ? "bg-emerald-100" : "bg-blue-100",
        )}
      >
        {isAI ? (
          <Bot className="h-4 w-4 text-emerald-600" />
        ) : (
          <User className="h-4 w-4 text-blue-600" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          isAI ? "bg-gray-100 text-gray-900" : "bg-emerald-600 text-white",
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isAI ? "text-gray-500" : "text-emerald-100",
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
