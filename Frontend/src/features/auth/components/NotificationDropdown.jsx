import React, { useRef, useEffect } from 'react';
import { Mail, CheckCheck, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import './NotificationDropdown.scss';

const NotificationDropdown = ({
    notifications,
    onMarkAllRead,
    onResendVerification,
    onClose,
    onClearAllNotifications,
    loadingResend,
    resendMessage,
    resendError,
}) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const notificationsListRef = useRef(null);

    // Reset any inline styles from GSAP when notifications list is not empty
    useEffect(() => {
        if (notifications.length > 0 && notificationsListRef.current) {
            gsap.set(notificationsListRef.current, { clearProps: 'opacity,height' });
        }
    }, [notifications.length, notificationsListRef]);

    const handleClearAll = () => {
        if (!onClearAllNotifications) return;

        // Animate the list out
        if (notificationsListRef.current) {
            gsap.to(notificationsListRef.current, {
                opacity: 0,
                height: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    // Reset inline styles after animation to avoid leaving hidden element
                    gsap.set(notificationsListRef.current, { clearProps: 'opacity,height' });
                }
            });
        }
        onClearAllNotifications();
    };

    return (
        <div className="notification-dropdown">
            <div className="dropdown-header">
                <h3>Notifications</h3>
                <div className="header-actions">
                    {unreadCount > 0 && (
                        <button className="mark-read-btn" onClick={onMarkAllRead}>
                            <CheckCheck size={16} />
                            Mark all as read
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button className="clear-all-btn" onClick={handleClearAll}>
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            <div className="dropdown-body">
                {notifications.length === 0 ? (
                    <div className="empty-state">
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="notifications-list" ref={notificationsListRef}>
                        {notifications.map((notification) => (
                            <div 
                                key={notification._id} 
                                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                            >
                                <div className="notification-icon">
                                    <Mail size={18} />
                                </div>
                                <div className="notification-content">
                                    <p className="notification-message">{notification.message}</p>
                                    
                                    {notification.type === 'EMAIL_VERIFICATION' && (
                                        <div className="notification-actions">
                                            <button 
                                                className="resend-action-btn"
                                                onClick={onResendVerification}
                                                disabled={loadingResend}
                                            >
                                                {loadingResend ? (
                                                    <>
                                                        <Loader2 size={12} className="spinner" />
                                                        Sending...
                                                    </>
                                                ) : "Resend Link"}
                                            </button>
                                            
                                            {resendMessage && (
                                                <span className="resend-status success">{resendMessage}</span>
                                            )}
                                            {resendError && (
                                                <span className="resend-status error">{resendError}</span>
                                            )}
                                        </div>
                                    )}
                                    <span className="notification-time">
                                        {new Date(notification.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationDropdown;