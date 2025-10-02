// ChatHistory.tsx
import { useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import './_menu.scss';

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
  createdAt: Date;
};

function ChatHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = auth.currentUser;
  const sessionId = user?.uid || "anon";

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`http://localhost:3000/history/${sessionId}`);
        const data = await res.json();
        setMessages(data.history);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
      }
    }

    fetchHistory();
  }, [sessionId]);

  return (
    <div className="overlay">
      <h3>Histórico de Conversas</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className={msg.role}>
            <strong>{msg.role === "user"}:</strong> {msg.content}
            <br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHistory;
