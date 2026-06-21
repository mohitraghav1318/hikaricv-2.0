import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
    Home as HomeIcon,
    FileText,
    User,
    Bot,
    Plus,
    Download,
    FolderOpen
} from 'lucide-react';
import './DashboardSidebar.scss';

const DashboardSidebar = ({ reportId, onDownloadResume }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/dashboard';
    const isReport = location.pathname.startsWith('/interview/');

    const handleNotAvailable = () => {
        alert("This feature is not available yet.");
    };

    const handleInterviewReportClick = () => {
        if (isReport) {
            // Already on a report page — do nothing or stay
            return;
        }
        // From dashboard, scroll to recent plans section
        const section = document.querySelector('.recent-plans-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
                <span className="brand-dot"></span>
                HikariCV COACH
            </div>

            <nav className="sidebar-nav">
                <button
                    className={`nav-item ${isHome ? 'active' : ''}`}
                    onClick={() => navigate('/dashboard')}
                >
                    <HomeIcon size={18} />
                    <span>Home</span>
                </button>
                <button
                    className={`nav-item ${isReport ? 'active' : ''}`}
                    onClick={handleInterviewReportClick}
                >
                    <FileText size={18} />
                    <span>Interview Report</span>
                </button>
                <button className="nav-item" onClick={handleNotAvailable}>
                    <User size={18} />
                    <span>Interview Plans</span>
                </button>
                <button className="nav-item" onClick={handleNotAvailable}>
                    <Bot size={18} />
                    <span>AI Assistant</span>
                </button>
            </nav>

            <div className="sidebar-divider"></div>

            {/* Download Report — only when viewing a specific report */}
            {isReport && reportId && onDownloadResume && (
                <button
                    className="sidebar-download-btn"
                    onClick={() => onDownloadResume(reportId)}
                >
                    <Download size={16} />
                    <span>Download Report</span>
                </button>
            )}

            {/* All Resumes — always visible but not available */}
            <button className="nav-item" onClick={handleNotAvailable}>
                <FolderOpen size={18} />
                <span>All Resumes</span>
            </button>

            <div className="sidebar-spacer"></div>

            <button className="new-strategy-btn" onClick={handleNotAvailable}>
                <Plus size={16} />
                <span>New Strategy</span>
            </button>
        </aside>
    );
};

export default DashboardSidebar;
