import { useQuery } from "@tanstack/react-query";

export function useInitialChat(interviewId: string) {
  return useQuery({
    queryKey: ["chat", interviewId, "start"] as const,
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId: +interviewId,
          message: "__start__",
        }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return (await res.json()) as { role: string; content: string };
    },
    enabled: Boolean(interviewId),
  });
}
