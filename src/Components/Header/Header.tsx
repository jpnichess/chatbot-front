import './header.scss';

import type { User } from "firebase/auth";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import { useState } from "react";
import { IoReorderThree } from "react-icons/io5";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="header">
      <div className={`header-wrapper ${openMenu ? "menu-open" : ""}`}>
        <button className="menu-button" onClick={() => setOpenMenu(!openMenu)}>
          <IoReorderThree />
        </button>

        <h1 className="title">Chat FDP</h1>

        <div className="login-section">
          {user ? <Logout user={user} /> : <Login />}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${openMenu ? "open" : ""}`}>
        <div id="top-menu">
          <button className="close-button" onClick={() => setOpenMenu(false)}>
            X
          </button>
        </div>
      </div>

      {openMenu && (
        <div className="overlay" onClick={() => setOpenMenu(false)} />
      )}
    </header>
  );
}


export default Header;
