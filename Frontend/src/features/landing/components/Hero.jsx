import React from "react";
import { Link } from "react-router";
import "../style/hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <h1>Welcome to HiariCV</h1>
      <p>Your AI-powered interview preparation platform.</p>
      <Link to={"/register"} className="button primary-button">Register</Link>
    </div>
  );
};

export default Hero;  