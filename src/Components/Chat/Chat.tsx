import { useState } from "react";
import ChatInput from "./ChatInput";
import "./chat.scss";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (message: string) => {
    const userMsg: Message = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Adiciona a resposta da IA
      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Erro na resposta da IA:", error);
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
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Chat;
