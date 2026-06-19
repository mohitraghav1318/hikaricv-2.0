import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import SEO from "../../../seo/SEO";

import "../style/not-found.scss";

const NotFound = () => {
  return (
    <div className="hiaricv-app">
      <SEO 
        title="404 - Page Not Found | HikariCV" 
        description="The page you are looking for does not exist." 
      /><section className="not-found">
        <div className="not-found-glow"></div>
        <div className="not-found-container">
          <motion.div 
            className="not-found-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="not-found-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            >
              <span>404</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}
            >
              <h2 className="not-found-subtitle">
                Page not found
              </h2>
              <p className="not-found-description">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
              </p>

              <div className="not-found-buttons">
                <Link to="/" className="button primary-button">
                  <Home size={18} />
                  Back to Home
                </Link>
                <button 
                  onClick={() => window.history.back()}
                  className="button secondary-button"
                >
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section></div>
  );
};

export default NotFound;
