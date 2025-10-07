import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Chat from "../Chat/Chat";

export default function ChatPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const conversationId = query.get("id") || undefined;

  return (
    <div className="chat-page">
      <Header />
      <Chat conversationId={conversationId} />
    </div>
  );
}
