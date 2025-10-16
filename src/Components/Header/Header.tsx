// Importação dos estilos e componentes necessários
import "./header.scss";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { useState, useEffect } from "react";
import { IoReorderThree } from "react-icons/io5";
import ChatHistory from "../Menu/ChatHistory";
import { auth } from "../Firebase/FirebaseConfig";

// Interface para tipagem das conversas (histórico de chats)
interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

export default function Header() {
  // Estado que controla se o menu lateral está aberto ou fechado
  const [openMenu, setOpenMenu] = useState(false);

  // Estado que armazena as conversas do histórico
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Estado do usuário autenticado no Firebase
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  

  // Efeito para adicionar ou remover a classe do body quando o menu está aberto
  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("menu-open-body");
    } else {
      document.body.classList.remove("menu-open-body");
    }
  }, [openMenu]);

  // Efeito para monitorar o estado de autenticação do usuário no Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // Quando o usuário estiver logado, busca o histórico
      if (user) fetchHistory(user.uid);
    });

    // Remove o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  // Função assíncrona que busca o histórico de conversas do usuário
  async function fetchHistory(uid: string) {
    try {
      const res = await fetch(`http://localhost:3000/history/${uid}`);
      const data = await res.json();
      setConversations(data.history);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  }

  return (
    <header className="header">
      {/* Cabeçalho principal com título e botão do menu */}
      <div className={`header-wrapper ${openMenu ? "menu-open" : ""}`}>
        {/* Botão para abrir/fechar o menu lateral */}
        <button className="menu-button" onClick={() => setOpenMenu(!openMenu)}>
          <IoReorderThree />
        </button>

        {/* Título principal do aplicativo */}
        <h1 className="title">Flexa AI</h1>

        {/* Seção de login/logout */}
        <div className="login-section">
          {currentUser ? <Logout user={currentUser} /> : <Login />}
        </div>
      </div>

      {/* Menu lateral que exibe o histórico de conversas */}
      <div className={`sidebar ${openMenu ? "open" : ""}`}>
        <ChatHistory conversations={conversations} />
      </div>

      {/* Overlay para escurecer o fundo e fechar o menu ao clicar fora */}
      <div
        className={`overlay ${openMenu ? "active" : ""}`}
        onClick={() => setOpenMenu(false)}
      />
    </header>
  );
}
