import { useQuery } from "@tanstack/react-query";

export function useFetchFeedback(feedbackId: number) {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/feedback/${feedbackId}`);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      const { feedback } = await res.json();
      return feedback;
    },
    enabled: Boolean(feedbackId),
    retry: false,
  });
}
