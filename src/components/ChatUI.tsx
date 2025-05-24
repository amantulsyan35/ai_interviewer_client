type Msg = { role: string; content: string };
export default function ChatUI({ messages }: { messages: Msg[] }) {
  return (
    <div className="space-y-2 h-80 overflow-y-auto border p-2">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.role === "assistant" ? "text-blue-600" : "text-gray-800"}
        >
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
    </div>
  );
}
