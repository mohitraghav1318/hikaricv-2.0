import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
    Upload,
    ChevronRight,
    Rocket,
    CheckCircle2,
    Briefcase,
    FileCheck
} from 'lucide-react';
import "../style/home.scss";
import { useInterview } from '../hooks/useInterview.js';
import Loading from '../../../components/Loading';
import { useAuth } from '../../auth/hooks/useAuth.js';
import DashboardSidebar from '../components/DashboardSidebar';

const Home = () => {
    const { loading, generateReport, reports } = useInterview();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [profileMode, setProfileMode] = useState("upload"); // "upload" | "bio"
    const [selectedFile, setSelectedFile] = useState(null);
    const resumeInputRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleGenerateReport = async () => {
        if (!jobDescription.trim()) {
            alert("Please provide a target job description.");
            return;
        }

        const resumeFile = profileMode === "upload" ? selectedFile : null;

        if (profileMode === "upload" && !resumeFile) {
            alert("Please upload a resume or switch to paste bio.");
            return;
        }
        if (profileMode === "bio" && !selfDescription.trim()) {
            alert("Please provide a bio self-description.");
            return;
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription: profileMode === "bio" ? selfDescription : "",
                resumeFile
            });
            if (data && data._id) {
                navigate(`/interview/${data._id}`);
            }
        } catch (err) {
            console.error("Failed to generate plan:", err);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="dashboard-container">
            {/* Shared Sidebar */}
            <DashboardSidebar />

            {/* Main Content Area */}
            <main className="dashboard-main">
                {/* Welcome Banner */}
                <section className="welcome-banner">
                    <h1>Welcome back, {user?.username || 'Alex'}.</h1>
                    <p>Your next big career move starts with a perfect plan.</p>
                </section>

                {/* Plan Creation Section */}
                <section className="create-plan-card">
                    <div className="card-header">
                        <h2>Create Your Custom Interview Plan</h2>
                        <p>Paste the job details and upload your background to let AI architect your preparation strategy.</p>
                    </div>

                    <div className="card-grid">
                        {/* Target Job Description */}
                        <div className="grid-column">
                            <label className="column-label">TARGET JOB DESCRIPTION</label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job requirements, responsibilities, and company values here..."
                                className="description-textarea"
                                maxLength={5000}
                            />
                            <div className="char-counter">{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* Your Profile */}
                        <div className="grid-column">
                            <label className="column-label">YOUR PROFILE</label>

                            {profileMode === "upload" ? (
                                <div className="profile-box upload-mode">
                                    <label className="dropzone-area" htmlFor="resume-file">
                                        <div className="icon-wrapper">
                                            {selectedFile ? <FileCheck size={28} /> : <Upload size={28} />}
                                        </div>
                                        <p className="dropzone-title">
                                            {selectedFile ? selectedFile.name : "Upload Resume or Portfolio"}
                                        </p>
                                        <p className="dropzone-subtitle">
                                            {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF (Max 5MB)"}
                                        </p>
                                        <input
                                            ref={resumeInputRef}
                                            type="file"
                                            id="resume-file"
                                            accept=".pdf,.docx,.txt"
                                            onChange={handleFileChange}
                                            hidden
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        className="paste-bio-badge"
                                        onClick={() => setProfileMode("bio")}
                                    >
                                        OR PASTE BIO
                                    </button>
                                </div>
                            ) : (
                                <div className="profile-box bio-mode">
                                    <textarea
                                        value={selfDescription}
                                        onChange={(e) => setSelfDescription(e.target.value)}
                                        placeholder="Briefly describe your experience, key skills, and years of experience..."
                                        className="bio-textarea"
                                    />
                                    <button
                                        type="button"
                                        className="paste-bio-badge"
                                        onClick={() => setProfileMode("upload")}
                                    >
                                        OR UPLOAD RESUME
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card-actions">
                        <button className="generate-plan-btn" onClick={handleGenerateReport}>
                            <span>Generate My Plan</span>
                            <Rocket size={16} />
                        </button>
                    </div>
                </section>

                {/* My Recent Interview Plans */}
                <section className="recent-plans-section">
                    <div className="section-header">
                        <div>
                            <h2>My Recent Interview Plans</h2>
                            <p>Your AI-generated roadmaps for recent applications</p>
                        </div>
                    </div>

                    <div className="plans-list">
                        {reports.length === 0 ? (
                            <div className="no-plans-box">
                                <Briefcase size={36} />
                                <p>No interview plans generated yet. Create your first plan above!</p>
                            </div>
                        ) : (
                            reports.map((report) => (
                                <div
                                    key={report._id}
                                    className="plan-card-item"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <div className="plan-logo-wrapper">
                                        <Briefcase size={20} />
                                    </div>

                                    <div className="plan-info">
                                        <h3>{report.title || "Untitled Position"}</h3>
                                        <p>Generated {new Date(report.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</p>
                                    </div>

                                    <div className="plan-metrics">
                                        <div className="matchscore-badge">
                                            <CheckCircle2 size={14} />
                                            <span>{report.matchScore || 85}% MATCHSCORE</span>
                                        </div>
                                    </div>

                                    <button className="plan-action-btn">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
