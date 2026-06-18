import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

import "../style/navbar.scss";

const LandingNavbar = () => {

  const [open, setOpen] = useState(false);

  return (
    <header className="landing-navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link
          to="/"
          className="logo"
        >
          HikariCV
        </Link>


        {/* Nav Links */}

        <nav
          className={`nav-links ${open ? "active" : ""}`}
        >

          <a
            href="#resume"
            onClick={() => setOpen(false)}
          >
            Resume Gen
          </a>

          <a
            href="#interview"
            onClick={() => setOpen(false)}
          >
            Interview Prep
          </a>

          <a
            href="#skills"
            onClick={() => setOpen(false)}
          >
            Skill Analysis
          </a>

          <a
            href="#pricing"
            onClick={() => setOpen(false)}
          >
            Pricing
          </a>


          {/* Mobile only */}

          <Link
            to="/login"
            className="mobile-login"
            onClick={() => setOpen(false)}
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="mobile-btn"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>

        </nav>


        {/* Desktop Buttons */}

        <div className="nav-actions">

          <Link
            to="/login"
            className="login"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="get-started"
          >
            Get Started
          </Link>

        </div>


        {/* Hamburger */}

        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >

          {

            open

              ?

              <X size={28} />

              :

              <Menu size={28} />

          }

        </button>

      </div>

    </header>
  );
};

export default LandingNavbar;