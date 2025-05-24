import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation<
    { role: string; content: string },
    Error,
    { interviewId: string; message: string }
  >({
    mutationFn: async ({ interviewId, message }) => {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interviewId: +interviewId, message }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      return (await res.json()) as { role: string; content: string };
    },
    onSuccess: (data, vars) => {
      queryClient.setQueryData<{ role: string; content: string }[]>(
        ["chat", vars.interviewId],
        (old = []) => [...old, data],
      );
    },
  });
}
