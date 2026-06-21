import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, CheckCircle2, ShieldCheck, Star } from "lucide-react";

import "../style/hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      {/* Background blobs for premium depth */}
      <div className="hero-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="hero-badge">
            <Sparkles size={12} className="badge-icon-sparkle" />
            <span>Next-Gen Career Coach</span>
          </span>

          <h1>
            Elevate your career with
            <br />
            <span>AI-driven</span> precision.
          </h1>

          <p>
            From ATS-optimized resumes to real-time interview simulations,
            HikariCV is your personal career coach powered by the latest language models.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="button primary-button"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/login"
              className="button secondary-button"
            >
              <Play size={14} fill="currentColor" />
              <span>Login</span>
            </Link>
          </div>

          {/* Social Proof Stack */}
          <div className="hero-social-proof">
            <div className="avatar-stack">
              <div className="avatar avatar-1">M</div>
              <div className="avatar avatar-2">K</div>
              <div className="avatar avatar-3">A</div>
              <div className="avatar avatar-4">R</div>
            </div>
            <div className="social-text">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
                ))}
              </div>
              <p>Trusted by over <strong>10,000+</strong> candidates</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="hero-image-glow"></div>
          
          <div className="mockup-browser">
            <div className="browser-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <div className="browser-url">hikaricv.ai/dashboard</div>
            </div>
            <div className="image-wrapper">
              <img
                src="/landing/hero.png"
                alt="HikariCV AI Coach"
              />
            </div>

            {/* Floating Card 1: Score Indicator */}
            <div className="floating-card float-score">
              <div className="float-score-circle">
                <span className="number">94</span>
                <span className="percent">%</span>
              </div>
              <div className="float-score-text">
                <h4>Match Score</h4>
                <p>Strong candidate profile</p>
              </div>
            </div>

            {/* Floating Card 2: Skill Check */}
            <div className="floating-card float-skills">
              <div className="skills-header">
                <ShieldCheck size={16} className="skills-icon" />
                <span>Competency Core</span>
              </div>
              <div className="skills-list">
                <div className="skill-item">
                  <CheckCircle2 size={12} className="check-icon" />
                  <span>React & Node.js</span>
                </div>
                <div className="skill-item">
                  <CheckCircle2 size={12} className="check-icon" />
                  <span>System Design</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;