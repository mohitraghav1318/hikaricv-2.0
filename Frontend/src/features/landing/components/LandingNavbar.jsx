import { Link } from "react-router";

import "../style/navbar.scss";

const LandingNavbar = () => {
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


        {/* Center Links */}

        <nav className="nav-links">

          <a href="#resume">

            Resume Gen

          </a>

          <a href="#interview">

            Interview Prep

          </a>

          <a href="#skills">

            Skill Analysis

          </a>

          <a href="#pricing">

            Pricing

          </a>

        </nav>


        {/* Right */}

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

      </div>

    </header>
  );
};

export default LandingNavbar;