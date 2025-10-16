import { useState, useEffect } from "react"; // Importa hooks do React: useState para estado e useEffect para efeitos colaterais
import { auth } from "./Components/Firebase/FirebaseConfig"; // Importa a configuração do Firebase Authentication
import type { User } from "firebase/auth"; // Importa o tipo User do Firebase para tipagem
import { onAuthStateChanged } from "firebase/auth"; // Função para ouvir mudanças no estado de autenticação
import Header from "./Components/Header/Header"; // Componente do cabeçalho
import Chat from "./Components/Chat/Chat"; // Componente do chat

function App() {
  // Estado para armazenar o usuário autenticado; inicialmente é null (nenhum usuário)
  const [user, setUser] = useState<User | null>(null);

  // useEffect para configurar um listener de autenticação ao montar o componente
  useEffect(() => {
    // onAuthStateChanged retorna uma função de "unsubscribe" para parar de ouvir mudanças
    const unsubscribe = onAuthStateChanged(auth, setUser);
    
    // cleanup function: desinscreve o listener ao desmontar o componente
    return () => unsubscribe();
  }, []); // O array vazio [] garante que o efeito execute apenas uma vez

  return (
    <>
      {/* Passa o usuário atual para o Header, para que ele saiba se alguém está logado */}
      <Header user={user} />
      
      <main>
        {/* Componente principal do chat */}
        <Chat />
      </main>
    </>
  );
}

export default App; // Exporta o componente App como padrão
