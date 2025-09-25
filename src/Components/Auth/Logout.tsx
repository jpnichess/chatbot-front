import { auth } from "../Firebase/FirebaseConfig";
import { signOut, type User } from "firebase/auth";
import { LogOut } from "lucide-react";
import './auth.scss';

interface LogoutProps {
  user: User; 
}

export default function Logout(LogoutProps) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout realizado!");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  return (
    <div className="auth">
      <button onClick={handleLogout} className="logout_btn">
        Sair 
         <LogOut />
      </button>
    </div>
  );
}
