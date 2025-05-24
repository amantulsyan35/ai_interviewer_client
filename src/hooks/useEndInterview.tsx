import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface EndInterviewResponse {
  feedbackId: number;
}

export function useEndInterview(interviewId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId: +interviewId }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return (await res.json()) as EndInterviewResponse;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["initialChat", interviewId] });

      navigate(`/feedback/${data.feedbackId}`);
    },
  });
}
