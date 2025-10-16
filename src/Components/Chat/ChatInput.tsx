// Importa hooks essenciais do React
import { useState, useRef, useEffect } from "react";

// Importa a autenticação do Firebase (para verificar se o usuário está logado)
import { auth } from "../Firebase/FirebaseConfig.js";

// Importa o estilo específico do input do chat
import "./chatInput.scss";

// Componente ChatInput: campo de texto e botão para enviar mensagens
// Recebe como propriedade (prop) uma função 'onSend', que envia a mensagem ao Chat
function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  // Estado que guarda o texto digitado pelo usuário
  const [input, setInput] = useState("");

  // Referência ao elemento <textarea>, usada para ajustar o tamanho dinamicamente
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Obtém o usuário atual do Firebase Authentication
  const user = auth.currentUser;

  // 🔄 Ajusta automaticamente a altura do textarea conforme o texto cresce
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reseta antes de recalcular
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px"; // ajusta conforme o conteúdo
    }
  }, [input]); // é executado sempre que o valor de 'input' muda

  // 🚀 Envia a mensagem digitada
  const handleSubmit = () => {
    const trimmed = input.trim(); // remove espaços extras
    if (!trimmed) return false; // não envia mensagens vazias

    // Garante que o usuário esteja logado antes de enviar
    if (!user) {
      alert("Entre com sua conta do Google para enviar sua pergunta.");
      return false;
    }

    // Chama a função passada pelo componente pai (Chat)
    onSend(trimmed);
    setInput(""); // limpa o campo de texto após enviar
    return true;
  };

  // ⌨️ Permite enviar mensagem ao pressionar Enter (sem Shift)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // impede quebra de linha
      handleSubmit(); // envia a mensagem
    }
  };

  // 📤 Captura o evento do formulário (ex: clique no botão "Enviar")
  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // evita recarregar a página
    handleSubmit();
  };

  // 🧩 Renderização do componente
  return (
    <div className="user-part">
      <form onSubmit={onFormSubmit} className="user-form">
        {/* Campo de texto (textarea) com redimensionamento automático */}
        <textarea
          ref={textareaRef}
          className="user-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          rows={1}
          onKeyDown={handleKeyDown}
        />

        {/* Botão para enviar a mensagem manualmente */}
        <button type="submit" className="send-button">
          Enviar
        </button>
      </form>
    </div>
  );
}

// Exporta o componente para uso no Chat principal
export default ChatInput;
