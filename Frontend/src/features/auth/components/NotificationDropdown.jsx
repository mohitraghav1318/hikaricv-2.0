import React from 'react';
import { Mail, CheckCheck, Loader2 } from 'lucide-react';
import './NotificationDropdown.scss';

const NotificationDropdown = ({
    notifications,
    onMarkAllRead,
    onResendVerification,
    loadingResend,
    resendMessage,
    resendError,
    onClose
}) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="notification-dropdown">
            <div className="dropdown-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={onMarkAllRead}>
                        <CheckCheck size={16} />
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="dropdown-body">
                {notifications.length === 0 ? (
                    <div className="empty-state">
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="notifications-list">
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
