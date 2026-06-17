import { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import '../style/ui/navbar.scss';

const NAV_LINKS = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'Features', href: '#features' },
  { label: 'About Us', href: '#about' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu automatically if viewport grows back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 880) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={shouldReduceMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__inner">
        {/* Brand — left */}
        <a href="/" className="navbar__brand" aria-label="HikariCV home">
          <span className="navbar__brand-light">Hikari</span>
          <span className="navbar__brand-accent">CV</span>
        </a>

        {/* Pricing / Features / About Us — center (desktop) */}
        <nav
          className="navbar__links"
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link, i) => (
            <div
              key={link.label}
              className="navbar__link-wrap"
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
              {hoveredIndex === i && (
                <motion.div
                  className="navbar__underline"
                  layoutId="navUnderline"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32 }
                  }
                />
              )}
            </div>
          ))}
        </nav>

        {/* Login / Sign Up — right (desktop) */}
        <div className="navbar__actions">
          <a href="/login" className="navbar__login">
            Login
          </a>
          <motion.a
            href="/register"
            className="navbar__signup"
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            Sign Up
            <ArrowRight size={16} strokeWidth={2.25} />
          </motion.a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="navbar__mobile-inner"
              initial="closed"
              animate="open"
              variants={{
                closed: {},
                open: {
                  transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setIsOpen(false)}
                  variants={{
                    closed: { opacity: 0, x: -16 },
                    open: { opacity: 1, x: 0 },
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="navbar__mobile-actions">
                <a
                  href="/login"
                  className="navbar__login navbar__login--mobile"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="navbar__signup navbar__signup--mobile"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                  <ArrowRight size={16} strokeWidth={2.25} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
