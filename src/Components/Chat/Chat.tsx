import { useState } from "react";
import ChatInput from "./ChatInput";
import { auth } from "../Firebase/FirebaseConfig.js";
import "./chat.scss";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = auth.currentUser;
  const sessionId = user?.uid || "anon";

  const handleSend = async (message: string) => {
    const userMsg: Message = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // Adiciona placeholder para a resposta do bot
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

        const chunk = decoder.decode(value);
        fullText += chunk;

        // Atualiza o último bot message com streaming
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botId ? { ...msg, text: fullText } : msg))
        );
      }
    } catch (error) {
      console.error("Erro na resposta da IA:", error);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === botId ? { ...msg, text: "Erro ao gerar resposta." } : msg))
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
      </div>
      <div className="user-wraper">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;
