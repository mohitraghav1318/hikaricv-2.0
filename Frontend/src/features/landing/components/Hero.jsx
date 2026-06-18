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
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <span className="hero-badge">
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <div className="hero-image-glow"></div>

          <img
  src="/landing/hero.png"
  alt="Interview AI"
/>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;