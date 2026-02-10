import { NavLink } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";
import "./Home.css";

export const Home = () => {
  const { isLoggedIn } = useBioContext();

  return (
    <main className="home-main">
      {/* ===== HERO SECTION ===== */}
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-badge">🚀 Modern Authentication</span>
          <h1 className="home-title">
            Secure Access
            <span className="gradient-text"> Made Simple</span>
          </h1>
          
          <p className="home-description">
            Authify is your all-in-one authentication platform — built for secure
            and seamless access. From sign up to Google OAuth, we provide
            enterprise-grade security with a beautiful developer experience.
          </p>

          {!isLoggedIn && (
            <div className="home-buttons">
              <NavLink to="/register" className="btn primary-btn">
                <span className="btn-icon">🎯</span>
                Get Started Free
              </NavLink>
              <NavLink to="/login" className="btn secondary-btn">
                <span className="btn-icon">🔐</span>
                Sign In
              </NavLink>
            </div>
          )}
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">⚡</div>
              <div className="stat-label">Fast Auth</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">🔒</div>
              <div className="stat-label">Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <h3>JWT Authentication</h3>
          <p>Secure token-based authentication with automatic refresh</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>OAuth 2.0</h3>
          <p>Google, GitHub & social login integrations</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📧</div>
          <h3>Email Verification</h3>
          <p>Secure account activation workflow</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔑</div>
          <h3>Password Recovery</h3>
          <p>Forgot password & reset functionality</p>
        </div>
      </section>

      {/* ===== ARCHITECTURE OVERVIEW ===== */}
      <section className="home-architecture">
        <div className="section-header">
          <h2 className="section-title">How Authify Works</h2>
          <div className="section-divider"></div>
        </div>
        <p className="architecture-description">
          Authify follows a backend-first, security-driven authentication
          architecture. Every request is validated, authenticated, and guarded
          using industry-standard practices with modern tech stack.
        </p>
        
        <div className="tech-stack">
          <div className="tech-item">Node.js</div>
          <div className="tech-item">Express</div>
          <div className="tech-item">JWT</div>
          <div className="tech-item">Zod</div>
          <div className="tech-item">MongoDB</div>
          <div className="tech-item">React</div>
        </div>
      </section>

      {/* ===== AUTH FLOW ===== */}
      <section className="home-flow">
        <div className="section-header">
          <h2 className="section-title">Authentication Flow</h2>
          <div className="section-divider"></div>
        </div>

        <div className="flow-steps">
          <div className="flow-step">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>User Registration</h3>
              <p>
                User input is validated using <strong>Zod schemas</strong>, passwords
                are hashed, user data is stored securely, and email verification
                is sent for account activation.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Login & Token Generation</h3>
              <p>
                Credentials are validated using Zod. Upon success, Authify
                generates <strong>Access Token</strong> and
                <strong> Refresh Token</strong>, stored in HTTP-only cookies.
              </p>
            </div>
          </div>

          <div className="flow-step">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Protected Routes</h3>
              <p>
                Authentication middleware verifies tokens on every protected
                request and injects the authenticated user into request lifecycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECURITY ===== */}
      <section className="home-security">
        <div className="section-header">
          <h2 className="section-title">Security Features</h2>
          <div className="section-divider"></div>
        </div>

        <div className="security-grid">
          <div className="security-item">
            <div className="security-icon">✅</div>
            <h4>Zod Validation</h4>
            <p>Type-safe request validation</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🛡️</div>
            <h4>JWT Tokens</h4>
            <p>Secure token-based authentication</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🍪</div>
            <h4>HTTP-Only Cookies</h4>
            <p>Safe token storage</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🚫</div>
            <h4>Rate Limiting</h4>
            <p>Protection against brute force</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🔑</div>
            <h4>Password Hashing</h4>
            <p>bcrypt password encryption</p>
          </div>
          <div className="security-item">
            <div className="security-icon">📧</div>
            <h4>Email Verification</h4>
            <p>Secure account activation</p>
          </div>
        </div>
      </section>

      {/* ===== ADVANCED ===== */}
      <section className="home-advanced">
        <div className="section-header">
          <h2 className="section-title">Advanced Capabilities</h2>
          <div className="section-divider"></div>
        </div>

        <div className="advanced-grid">
          <div className="advanced-card">
            <div className="advanced-icon">🔗</div>
            <h3>Google OAuth Login</h3>
            <p>
              Users can authenticate via Google OAuth. OAuth users may optionally
              set a password later to enable email-password login.
            </p>
          </div>

          <div className="advanced-card">
            <div className="advanced-icon">🔄</div>
            <h3>Password Management</h3>
            <p>
              Authify supports forgot password, reset password, password updates,
              and secure token-based recovery workflows.
            </p>
          </div>

          <div className="advanced-card">
            <div className="advanced-icon">🖼️</div>
            <h3>Profile Image Upload</h3>
            <p>
              Authenticated users can upload profile images using Cloudinary for
              optimized storage and delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      {!isLoggedIn && (
        <section className="cta-section">
          <h2>Ready to Secure Your Application?</h2>
          <p>Join thousands of developers who trust Authify for authentication</p>
          <NavLink to="/register" className="btn cta-btn">
            Start Free Today →
          </NavLink>
        </section>
      )}
    </main>
  );
};