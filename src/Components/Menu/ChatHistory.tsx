import { useNavigate } from "react-router-dom";
import "./_menu.scss";

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

interface ChatHistoryProps {
  conversations: Conversation[];
}

function ChatHistory({ conversations }: ChatHistoryProps) {
  const navigate = useNavigate();

  function handleClick(conv: Conversation) {
    const query = new URLSearchParams();
    query.set("id", conv.id);
    query.set("title", conv.title);
    navigate(`/chat?${query.toString()}`);
  }

  return (
    <div className="chat-history">
      <h3 className="menu-title">Histórico de Conversas</h3>
      <ul className="last-mets">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            className="conversation-item"
            onClick={() => handleClick(conv)}
          >
            <strong>{conv.title || "Nova conversa"}</strong>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHistory;