import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Brain } from "lucide-react";
import { useFetchFeedback } from "../hooks/useFeeback";

export default function FeedbackPage() {
  const { feedbackId = "" } = useParams<{ feedbackId: string }>();
  const navigate = useNavigate();
  const {
    data: feedback,
    isLoading,
    isError,
    error,
  } = useFetchFeedback(+feedbackId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">
              InterviewAI
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-lg">
        {isLoading && (
          <Card className="animate-pulse">
            <CardContent className="text-center py-10">
              Loading feedback…
            </CardContent>
          </Card>
        )}

        {isError && (
          <Card>
            <CardContent className="space-y-4 text-center py-6">
              <p className="text-red-600">Error: {error.message}</p>
              <Button onClick={() => navigate("/")}>Go Home</Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && (
          <Card className="shadow-lg">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-2">
                <Badge className="bg-emerald-100 text-emerald-800">
                  Feedback #{feedbackId}
                </Badge>
                <span className="text-gray-600">Your Interview Feedback</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">{feedback}</div>
              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => navigate("/")}
                >
                  Start New Interview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
