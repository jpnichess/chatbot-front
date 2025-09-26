// src/components/ChatInput.tsx
import { useState } from "react";
import type { FormEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        className="user-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button type="submit" className="send-button">Enviar</button>
    </form>
  );
}

export default ChatInput;

