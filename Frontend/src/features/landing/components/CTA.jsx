import React from "react";
import { Link } from "react-router";
const CTA = () => {
  return (
    <div className="cta">
      <h2>Ready to take your interview skills to the next level?</h2>

      <Link to={"/register"} className="button primary-button">Register</Link>
      
    </div>
  );
};

export default CTA;