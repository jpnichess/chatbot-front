// Importa o módulo de autenticação configurado do Firebase
import { auth } from "../Firebase/FirebaseConfig.ts";

// Importa os métodos necessários do Firebase Authentication
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Importa o arquivo de estilo específico desse componente
import "./auth.scss";

// Componente funcional React responsável pelo login com Google
function Login() {
  // Função assíncrona que realiza o login com a conta Google
  const LoginGoogle = async () => {
    // Cria uma nova instância do provedor de autenticação do Google
    const provider = new GoogleAuthProvider();

    try {
      // Abre o popup para o usuário selecionar a conta Google e autenticar
      const result = await signInWithPopup(auth, provider);

      // Exibe no console as informações do usuário logado
      console.log("Usuário Logado:", result.user);
    } catch (error) {
      // Caso ocorra algum erro (ex: usuário cancelar o login)
      console.log("Erro ao logar na conta", error);
    }
  };

  // Retorna o JSX que renderiza o botão de login
  return (
    <div className="auth">
      {/* Botão que, ao ser clicado, chama a função de login */}
      <button onClick={LoginGoogle} className="login_btn">
        Entrar com Google
      </button>
    </div>
  );
}

// Exporta o componente para ser usado em outras partes da aplicação
export default Login;
