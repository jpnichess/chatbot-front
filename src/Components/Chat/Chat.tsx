import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { auth } from "../Firebase/FirebaseConfig.js";
import "./chat.scss";

type Message = {
  id: string | number;
  text: string;
  sender: "user" | "bot";
};

interface APIMessage {
  id: string;
  role: "user" | "model";
  content: string;
  createdAt: string;
}

interface ChatProps {
  conversationId?: string;
}

export default function Chat({ conversationId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = auth.currentUser;
  const sessionId = conversationId || user?.uid || "anon";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatic Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // History
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`http://localhost:3000/history-detail/${sessionId}`);
        const data: { messages: APIMessage[] } = await res.json();

        const history = data.messages.map((msg) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.role === "user" ? "user" : "bot" as "user" | "bot",
        }));

        setMessages(history);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
      }
    }

    fetchHistory();
  }, [sessionId]);

  const handleSend = async (message: string) => {
    const userMsg: Message = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const botId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: botId, text: "", sender: "bot" }]);

    try {
      const res = await fetch("http://localhost:3000/stream-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botId ? { ...msg, text: fullText } : msg))
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: "Erro ao gerar resposta." } : msg
        )
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-card ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="user-wrapper">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
