import type { User } from "firebase/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  return (
    <header className="header">
        <button
            className="menu_button"
            onClick={() => setOpenMenu(!openMenu)}
          >
          </button>

      <h1 className="title">JP GPT</h1>
      <div className="">

      </div>
      <div className="login_section">
        {user ? <Logout user={user} /> : <Login />}
      </div>
    </header>
  );
}

export default Header;
