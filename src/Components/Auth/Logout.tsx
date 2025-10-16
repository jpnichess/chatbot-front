// Importa a configuração do Firebase Authentication
import { auth } from "../Firebase/FirebaseConfig";

// Importa a função de logout e o tipo User do Firebase Authentication
import { signOut, type User } from "firebase/auth";

// Importa o ícone de logout da biblioteca lucide-react (ícones em React)
import { LogOut } from "lucide-react";

// Importa o arquivo de estilos específico para autenticação
import "./auth.scss";

// Define a interface dos props que o componente receberá
// Nesse caso, espera um objeto 'user' do tipo User (fornecido pelo Firebase)
interface LogoutProps {
  user: User;
}

// Componente funcional responsável por encerrar a sessão do usuário
function Logout({ user }: LogoutProps) {
  // Função chamada ao clicar no botão de sair
  const handleLogout = () => {
    // Executa a função de logout do Firebase
    signOut(auth)
      .then(() => {
        // Se o logout for bem-sucedido, mostra no console quem saiu
        console.log(
          `Logout realizado para o usuário: ${user.displayName || user.email}`
        );
      })
      .catch((error) => {
        // Caso aconteça algum erro (ex: problema de conexão)
        console.error("Erro ao fazer logout:", error);
      });
  };

  // JSX que renderiza o botão de logout na tela
  return (
    <div className="auth">
      {/* Botão com evento de clique para sair da conta */}
      <button onClick={handleLogout} className="logout_btn">
        Sair <LogOut /> {/* Ícone ao lado do texto */}
      </button>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos do projeto
export default Logout;
