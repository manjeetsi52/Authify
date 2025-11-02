import { NavLink } from "react-router-dom";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useBioContext } from "../../hooks/UseBioContext";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn } = useBioContext()

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="headerParent">
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <h1>AuthiFy</h1>
        </div>

        {/* Navbar */}
        <div className="navbar">
          <nav>
            <ul className={showMenu ? "mobile-navbar" : "desktop-navbar"}>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setShowMenu(false)}
                >
                  Home
                </NavLink>
              </li>
              {isLoggedIn ? (
                <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setShowMenu(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                 <li>
                  <NavLink
                    to="/logout"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setShowMenu(false)}
                  >
                    Logout
                  </NavLink>
                </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setShowMenu(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => setShowMenu(false)}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Hamburger button */}
            <div className="ham-div">
              <button onClick={handleShowMenu}>
                <GiHamburgerMenu />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
