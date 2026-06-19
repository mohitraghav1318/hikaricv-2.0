import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import "../style/hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-badge">
            <span className="badge-dot"></span>
            NEXT-GEN CAREER TECH
          </span>

          <h1>
            Elevate your career with
            <br />
            <span>AI-driven</span> precision.
          </h1>

          <p>
            From ATS-optimized resumes to real-time interview
            simulations, HikariCV is your personal career coach
            powered by the latest language models.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="button primary-button"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="button secondary-button"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="hero-image-glow"></div>
          <div className="image-wrapper">
            <img
              src="/landing/hero.png"
              alt="Interview AI"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;