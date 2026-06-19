import "../style/ui/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="/" className="footer__brand" aria-label="HikariCV home">
          <span>Hikari</span>
          <span className="footer__brand-accent">CV</span>
        </a>

        <nav className="footer__links" aria-label="Footer">
          <a href="/docs">Docs</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
        </nav>

        <p className="footer__copy">© 2026 HikariCV. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
