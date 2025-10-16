// Importa o hook useLocation do react-router-dom para acessar a URL atual
import { useLocation } from "react-router-dom";

// Importa os componentes do cabeçalho e do chat
import Header from "../Header/Header";
import Chat from "../Chat/Chat";

// Componente da página de chat
export default function ChatPage() {
  // Hook que retorna informações sobre a localização atual (URL)
  const location = useLocation();

  // Cria um objeto URLSearchParams para extrair parâmetros da query string
  const query = new URLSearchParams(location.search);

  // Obtém o ID da conversa a partir da query string, ou undefined se não existir
  const conversationId = query.get("id") || undefined;

  // JSX da página: exibe o Header e o Chat
  return (
    <div className="chat-page">
      {/* Cabeçalho do aplicativo */}
      <Header />

      {/* Componente Chat, recebendo o conversationId */}
      <Chat conversationId={conversationId} />
    </div>
  );
}
