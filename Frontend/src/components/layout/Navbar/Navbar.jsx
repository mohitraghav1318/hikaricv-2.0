import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, Bell } from "lucide-react";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { getNotifications, markNotificationsAsRead } from "../../../features/auth/services/notification.api";
import { resendVerification } from "../../../features/auth/services/auth.api";
import NotificationDropdown from "../../../features/auth/components/NotificationDropdown";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data.notifications);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest(`.${styles.bellContainer}`)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setLoadingResend(true);
    setResendMessage("");
    setResendError("");
    try {
      const data = await resendVerification({ email: user.email });
      setResendMessage(data.message || "Verification email sent!");
    } catch (err) {
      setResendError(err.message || "Failed to resend link.");
    } finally {
      setLoadingResend(false);
    }
  };

  const handleLogoutClick = async () => {
    if (handleLogout) await handleLogout();
    setOpen(false);
    navigate("/login");
  };

  const NavLinks = ({ onClick }) => (
    <>
      <Link to="/pricing" onClick={onClick}>Pricing</Link>
      <Link to="/docs" onClick={onClick}>Docs</Link>
      <Link to="/about" onClick={onClick}>About Us</Link>
    </>
  );

  const Bell_ = () => (
    <div className={styles.bellContainer}>
      <button className={styles.bellBtn} onClick={() => setDropdownOpen((v) => !v)}>
        <Bell size={22} />
        {unreadCount > 0 && <span className={styles.badge} />}
      </button>
      {dropdownOpen && (
        <NotificationDropdown
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onResendVerification={handleResendVerification}
          loadingResend={loadingResend}
          resendMessage={resendMessage}
          resendError={resendError}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Hikari<span className={styles.logoAccent}>CV</span>
        </Link>

        <nav className={`${styles.navLinks} ${open ? styles.active : ""}`}>
          <NavLinks onClick={() => setOpen(false)} />
          {!user ? (
            <div className={styles.mobileOnly}>
              <Link to="/login" onClick={() => setOpen(false)}>Log In</Link>
              <Link to="/register" className={styles.mobileCta} onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </div>
          ) : (
            <div className={styles.mobileOnly}>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <button className={styles.mobileCta} onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </nav>

        <div className={styles.actions}>
          {!user ? (
            <>
              <Link to="/login" className={styles.loginLink}>Log In</Link>
              <Link to="/register" className={styles.cta}>Get Started</Link>
            </>
          ) : (
            <>
              <Bell_ />
              <Link to="/dashboard" className={styles.loginLink}>Dashboard</Link>
              <button className={styles.cta} onClick={handleLogoutClick}>Logout</button>
            </>
          )}
        </div>

        <div className={styles.mobileRight}>
          {user && <Bell_ />}
          <button className={styles.menuBtn} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;