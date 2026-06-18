import { Link } from "react-router";
import "../style/cta.scss";

const CTA = () => {
  return (
    <section className="cta">

      <div className="cta-container">

        <div className="circle top"></div>

        <div className="circle bottom"></div>

        <h2>

          Ready to Ace Your

          <span> Next Interview?</span>

        </h2>

        <p>

          Join thousands of students and professionals
          using AI to build resumes, practice interviews,
          and land better jobs.

        </p>

        <div className="cta-buttons">

          <Link
            to="/register"
            className="cta-primary"
          >

            Start Free Practice

          </Link>

          <Link
            to="/demo"
            className="cta-secondary"
          >

            View Demo

          </Link>

        </div>

        <span className="cta-note">

          No credit card required. Cancel anytime.

        </span>

      </div>

    </section>
  );
};

export default CTA;