import { Link } from "react-router";
import { useRef } from "react";
import { IconGithub, IconLinkedin, IconMail, IconSparkles, IconArrowUpRight } from "./FooterIcons";
import styles from "./Footer.module.scss";
import { useFooterReveal } from "./hooks/useFooterReveal";

const PRODUCT_LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Pricing", to: "/pricing" },
];

const COMPANY_LINKS = [
  { label: "About", to: "/about" },
  { label: "Docs", to: "/docs" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/mohitraghav1318", icon: IconGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohitraghav1318", icon: IconLinkedin },
  { label: "Email", href: "mailto:hello@hikaricv.com", icon: IconMail },
];

const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const Footer = () => {
  const footerRef = useRef(null);
  const columnRefs = useRef([]);
  columnRefs.current = [];

  const registerColumn = (el) => {
    if (el && !columnRefs.current.includes(el)) {
      columnRefs.current.push(el);
    }
  };

  useFooterReveal(footerRef, columnRefs);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol} ref={registerColumn}>
            <Link to="/" className={styles.brand} aria-label="HikariCV home">
              <span className={styles.mark}>
                <IconSparkles size={16} strokeWidth={2.25} />
              </span>
              Hikari<span className={styles.brandAccent}>CV</span>
            </Link>

            <p className={styles.tagline}>
              AI resume and interview coaching that gets you past the filter,
              not just past your own second-guessing.
            </p>

            <div className={styles.socials}>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.socialLink}
                  aria-label={label}
                >
                  <Icon size={17} strokeWidth={1.9} />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.linkCol} aria-label="Product" ref={registerColumn}>
            <h3>Product</h3>
            <ul>
              {PRODUCT_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.linkCol} aria-label="Company" ref={registerColumn}>
            <h3>Company</h3>
            <ul>
              {COMPANY_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.ctaCol} ref={registerColumn}>
            <h3>Ready to fix your resume?</h3>
            <p>Upload it and see your score in under a minute.</p>
            <Link to="/register" className={styles.ctaButton}>
              Get started
              <IconArrowUpRight size={15} strokeWidth={2.25} />
            </Link>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} HikariCV. All rights reserved.</p>

          <ul className={styles.legal}>
            {LEGAL_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;