import { useQuery } from "@tanstack/react-query";

export function useFetchFeedback(feedbackId: number) {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/feedback/${feedbackId}`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const { feedback } = await res.json();
      return feedback;
    },
    enabled: Boolean(feedbackId),
    retry: false,
  });
}
