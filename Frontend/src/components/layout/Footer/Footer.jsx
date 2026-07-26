import { Link } from "react-router";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="HikariCV home">
          Hikari<span className={styles.brandAccent}>CV</span>
        </Link>

        <nav className={styles.links} aria-label="Footer">
          <Link to="/docs">Docs</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
        </nav>

        <p className={styles.copy}>© 2026 HikariCV. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;