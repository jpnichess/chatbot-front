// Importa hooks essenciais do React
import { useState, useEffect, useRef } from "react";

// Importa o componente de input de mensagem (campo de envio)
import ChatInput from "./ChatInput";

// Importa a autenticação do Firebase para identificar o usuário
import { auth } from "../Firebase/FirebaseConfig.js";

// Importa o arquivo de estilos do chat
import "./chat.scss";

// Define o tipo Message usado dentro do React (para renderização no chat)
type Message = {
  id: string | number;       // Identificador único da mensagem
  text: string;              // Conteúdo da mensagem
  sender: "user" | "bot";    // Indica quem enviou (usuário ou IA)
};

// Define a estrutura que vem da API do backend (mensagens salvas)
interface APIMessage {
  id: string;
  role: "user" | "model";   // O backend usa 'model' em vez de 'bot'
  content: string;
  createdAt: string;
}

// Define os parâmetros esperados no componente Chat
interface ChatProps {
  conversationId?: string;  // ID opcional para recuperar conversas antigas
}

// Componente principal do Chat
export default function Chat({ conversationId }: ChatProps) {
  // Armazena as mensagens do chat (estado principal)
  const [messages, setMessages] = useState<Message[]>([]);

  // Obtém o usuário logado no Firebase
  const user = auth.currentUser;

  // Cria um ID de sessão baseado no usuário ou em um ID existente
  const sessionId = conversationId || user?.uid || "anon";

  // Referência usada para rolar automaticamente até o fim do chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🌀 Scroll automático quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📜 Carrega o histórico de mensagens do backend
  useEffect(() => {
    async function fetchHistory() {
      try {
        // Busca o histórico da conversa pelo ID da sessão
        const res = await fetch(`http://localhost:3000/history-detail/${sessionId}`);
        const data: { messages: APIMessage[] } = await res.json();

        // Converte as mensagens da API para o formato usado pelo front
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

  // ✉️ Função chamada ao enviar uma nova mensagem
  const handleSend = async (message: string) => {
    // Adiciona a mensagem do usuário na tela imediatamente
    const userMsg: Message = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // Cria uma mensagem "vazia" do bot para começar a preencher o streaming
    const botId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: botId, text: "", sender: "bot" }]);

    try {
      // Envia a mensagem para o backend (rota de streaming)
      const res = await fetch("http://localhost:3000/stream-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, sessionId }),
      });

      // Lê os dados enviados em tempo real (streaming)
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // 🧠 Lê cada pedaço da resposta da IA conforme é gerado
      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // encerra quando a resposta terminar

        fullText += decoder.decode(value); // decodifica o texto parcial

        // Atualiza o texto exibido do bot conforme o streaming chega
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botId ? { ...msg, text: fullText } : msg))
        );
      }
    } catch (err) {
      // Caso o backend falhe, mostra uma mensagem de erro no chat
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botId ? { ...msg, text: "Erro ao gerar resposta." } : msg
        )
      );
    }
  };

  // 🧩 Renderização do chat
  return (
    <div className="chat-container">
      {/* Área onde as mensagens aparecem */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-card ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {/* Ref usado para scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* Campo de entrada de texto (input + botão enviar) */}
      <div className="user-wrapper">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
