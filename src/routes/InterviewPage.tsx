import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Brain, Send, Clock, FileText } from "lucide-react";
import { InterviewMessage } from "../components/interview-message";
import { InterviewControls } from "../components/interview-controls";
import { Separator } from "../components/ui/separator";
import { useInitialChat } from "../hooks/useInitialChat";
import { useSendMessage } from "../hooks/useSendMessage";
import { useEndInterview } from "../hooks/useEndInterview";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

export default function InterviewPage() {
  const { interviewId = "" } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: initialMsg, isLoading: loadingInitial } =
    useInitialChat(interviewId);
  const sendMsg = useSendMessage();
  const endInterview = useEndInterview(Number(interviewId));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (initialMsg) {
      setMessages([
        {
          id: Date.now().toString(),
          type: initialMsg.role === "user" ? "user" : "ai",
          content: initialMsg.content,
          timestamp: new Date(),
        },
      ]);
    }
  }, [initialMsg]);

  // Text to speech for AI
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    if (messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg.type === "ai") {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(lastMsg.content);
      window.speechSynthesis.speak(utter);
    }
  }, [messages]);

  const handleSubmitResponse = () => {
    const text = currentResponse.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((ms) => [...ms, userMsg]);
    setCurrentResponse("");

    sendMsg.mutate(
      { interviewId, message: text },
      {
        onSuccess: (reply) => {
          const aiMsg: Message = {
            id: Date.now().toString(),
            type: "ai",
            content: reply.content,
            timestamp: new Date(),
          };
          setMessages((ms) => [...ms, aiMsg]);
        },
      },
    );
  };

  // End the interview
  const handleEndInterview = () => {
    endInterview.mutate(undefined, {
      onSuccess: (data) => {
        navigate(`/feedback/${data.feedbackId}`);
      },
    });
  };

  // Format elapsed time as MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">
                InterviewAI
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800"
            >
              Live
            </Badge>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <InterviewControls
              isActive={!loadingInitial}
              isPaused={false}
              onTogglePause={() => {}}
              onEndInterview={handleEndInterview}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-4 gap-6">
        {/* Chat */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <InterviewMessage key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={currentResponse}
                      onChange={(e) => setCurrentResponse(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmitResponse();
                        }
                      }}
                      placeholder="Type your answer..."
                      disabled={sendMsg.isPending}
                      className="min-h-[80px] resize-none"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitResponse}
                    disabled={!currentResponse.trim() || sendMsg.isPending}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between mt-3 text-sm text-gray-500">
                  <span>Enter to send, Shift+Enter for newline</span>
                  <span>{currentResponse.length}/1000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Interview Details
              </h3>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interview ID:</span>
                  <span className="font-medium">{interviewId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elapsed:</span>
                  <span className="font-medium">{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Messages:</span>
                  <span className="font-medium">{messages.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
