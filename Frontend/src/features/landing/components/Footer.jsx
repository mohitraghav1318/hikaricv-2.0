import {
  Globe,
  Mail,
  Share2,
} from "lucide-react";

import "../style/footer.scss";

const Footer = () => {
  return (
    <footer className="landing-footer">

      <div className="footer-container">

        {/* Left */}

        <div className="footer-brand">

          <h2>HikariCV</h2>

          <p>

            © 2026 HikariCV.

            Career empowerment through AI.

          </p>

          <div className="footer-social">

            <a href="#">

              <Share2 size={18} />

            </a>

            <a href="#">

              <Globe size={18} />

            </a>

            <a href="#">

              <Mail size={18} />

            </a>

          </div>

        </div>


        {/* Product */}

        <div className="footer-column">

          <h4>PRODUCT</h4>

          <a href="#">Resume Builder</a>

          <a href="#">Interview Prep</a>

          <a href="#">Skill Analysis</a>

        </div>


        {/* Resources */}

        <div className="footer-column">

          <h4>RESOURCES</h4>

          <a href="#">Career Blog</a>

          <a href="#">Support</a>

          <a href="#">Cookie Policy</a>

        </div>


        {/* Legal */}

        <div className="footer-column">

          <h4>LEGAL</h4>

          <a href="#">Privacy Policy</a>

          <a href="#">Terms of Service</a>

        </div>

      </div>

      <span className="footer-note">

        Designed for ambitious careers.

      </span>

    </footer>
  );
};

export default Footer;