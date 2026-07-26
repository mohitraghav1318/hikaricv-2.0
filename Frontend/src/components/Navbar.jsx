import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, X, Bell } from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";
import { getNotifications, markNotificationsAsRead } from "../features/auth/services/notification.api";
import { resendVerification } from "../features/auth/services/auth.api";
import NotificationDropdown from "../features/auth/components/NotificationDropdown";

// import "../features/landing/style/navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
      if (!e.target.closest(".notification-bell-container")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
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
    if (handleLogout) {
      await handleLogout();
    }
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          HikariCV
        </Link>

        {/* Nav Links */}
        <nav className={`nav-links ${open ? "active" : ""}`}>
          <Link to="/pricing" className="Pricing">
            Pricing
          </Link>
          <Link to="/docs">
            Docs
          </Link>
          <Link to="/about">
            About US
          </Link>
          {/* Mobile only */}
          {!user ? (
            <>
              <Link to="/login" className="mobile-login" onClick={() => setOpen(false)}>
                Log In
              </Link>
              <Link to="/register" className="mobile-btn" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="mobile-login" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <button
                className="mobile-btn"
                onClick={handleLogoutClick}
                style={{ border: 'none', fontFamily: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Desktop Buttons */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="login">
                Log In
              </Link>
              <Link to="/register" className="get-started">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="notification-bell-container desktop-bell">
                <button 
                  className="bell-btn" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Bell size={24} />
                  {unreadCount > 0 && <span className="unread-badge"></span>}
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

              <Link to="/dashboard" className="login">
                Dashboard
              </Link>
              <button
                className="get-started"
                onClick={handleLogoutClick}
                style={{ border: 'none', fontFamily: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger & Mobile Bell */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {user && (
            <div className="notification-bell-container mobile-bell">
              <button 
                className="bell-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Bell size={24} />
                {unreadCount > 0 && <span className="unread-badge"></span>}
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
          )}

          <button className="menu-btn" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;