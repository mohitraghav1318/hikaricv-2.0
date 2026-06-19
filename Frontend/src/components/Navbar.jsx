import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";

import "../features/landing/style/navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    if (handleLogout) {
      await handleLogout();
    }
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          HikariCV
        </Link>

        {/* Nav Links */}
        <nav className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/pricing" className="Pricing">
            Pricing
          </Link>
          <Link to="/docs">
            Docs
          </Link>
          <Link to="/about">
            About US
          </Link>
          {/* Mobile only */}
          {!user ? (
            <>
              <Link to="/login" className="mobile-login" onClick={() => setOpen(false)}>
                Log In
              </Link>
              <Link to="/register" className="mobile-btn" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="mobile-login" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <button
                className="mobile-btn"
                onClick={handleLogoutClick}
                style={{ border: 'none', fontFamily: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Desktop Buttons */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="login">
                Log In
              </Link>
              <Link to="/register" className="get-started">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="login">
                Dashboard
              </Link>
              <button
                className="get-started"
                onClick={handleLogoutClick}
                style={{ border: 'none', fontFamily: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;