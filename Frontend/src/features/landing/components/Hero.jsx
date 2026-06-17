import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import "../style/hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1>
          Welcome to <span>HikariCV</span>
        </h1>

        <p>
          Prepare smarter with AI-powered resumes, mock interviews,
          technical questions, and personalized feedback.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="button primary-button">
            Get Started
          </Link>

          <Link to="/login" className="button secondary-button">
            Login
          </Link>
        </div>
      </motion.div>

      <div className="hero-glow"></div>
    </section>
  );
};

export default Hero;