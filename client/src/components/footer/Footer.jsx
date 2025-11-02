import { NavLink } from 'react-router-dom';
import './Footer.css'
import { useBioContext } from '../../hooks/UseBioContext';
export const Footer = () => {
      const {isLoggedIn} = useBioContext()
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Authify</h3>
          <p className="footer-text">
            Secure and seamless authentication for modern web applications.
          </p>

          <ul className="footer-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn &&
            <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            </>
            }
            <li>
              <NavLink to="/privacy">Privacy Policy</NavLink>
            </li>
          </ul>

          <p className="footer-copy">
            © 2025 Authify. Built with ❤️ using React & Node.js.
          </p>
        </div>
      </footer>
    </>
  );
};
