import { NavLink } from "react-router-dom";
import "./Home.css";
import { useBioContext } from "../../hooks/UseBioContext";
export const Home = () => {
  const { isLoggedIn } = useBioContext()

  return (
    <>
      <main className="home-container">
        <h1 className="home-title">Welcome to Authify</h1>
        <p className="home-description">
          Authify is your all-in-one authentication platform — built for secure
          and seamless access. Sign up, log in, reset passwords, or connect with
          Google — all in one place, with modern security and clean design.
        </p>

        {!isLoggedIn && (
          <div className="home-buttons">
            <NavLink to="/register" className="btn primary-btn">
              Get Started
            </NavLink>
            <NavLink to="/login" className="btn secondary-btn">
              LogIn
            </NavLink>
          </div>
        )}
      </main>
    </>
  );
};
