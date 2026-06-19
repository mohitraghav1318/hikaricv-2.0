import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";

import "../features/landing/style/navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          HikariCV
        </Link>

        {/* Nav Links */}
        <nav className={`nav-links ${open ? "active" : ""}`}>
          <a href="/pricing" onClick={() => setOpen(false)}>
            Pricing
          </a>
          <a href="/docs" onClick={() => setOpen(false)}>
            Docs
          </a>
          <a href="/about" onClick={() => setOpen(false)}>
            About us
          </a>

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
            <Link to="/dashboard" className="mobile-btn" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
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
            <Link to="/dashboard" className="get-started">
              Dashboard
            </Link>
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