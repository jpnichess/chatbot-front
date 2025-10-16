// Importa o hook useNavigate do react-router-dom para navegação programática
import { useNavigate } from "react-router-dom";

// Importa os estilos específicos do menu lateral
import "./_menu.scss";

// Interface para tipar cada conversa
interface Conversation {
  id: string; // ID único da conversa
  title: string; // Título ou resumo da conversa
  updatedAt: string; // Data da última atualização
}

// Interface para as props do componente ChatHistory
interface ChatHistoryProps {
  conversations: Conversation[]; // Lista de conversas do usuário
}

// Componente funcional que renderiza o histórico de conversas
function ChatHistory({ conversations }: ChatHistoryProps) {
  // Hook do react-router-dom que permite navegar entre páginas
  const navigate = useNavigate();

  // Função chamada ao clicar em uma conversa
  function handleClick(conv: Conversation) {
    // Cria os parâmetros de query string para a URL
    const query = new URLSearchParams();
    query.set("id", conv.id);
    query.set("title", conv.title);

    // Navega para a rota /chat com os parâmetros da conversa selecionada
    navigate(`/chat?${query.toString()}`);
  }

  // JSX do componente
  return (
    <div className="chat-history">
      {/* Título da seção */}
      <h3 className="menu-title">Histórico de Conversas</h3>

      {/* Lista de conversas */}
      <ul className="last-mets">
        {conversations.map((conv) => (
          <li
            key={conv.id} // Chave única para cada item da lista
            className="conversation-item" // Classe CSS para estilização
            onClick={() => handleClick(conv)} // Evento de clique
          >
            {/* Mostra o título ou "Nova conversa" se estiver vazio */}
            <strong>{conv.title || "Nova conversa"}</strong>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos
export default ChatHistory;
