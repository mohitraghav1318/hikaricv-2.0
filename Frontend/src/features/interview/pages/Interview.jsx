import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../../components/common/Loading'
import DashboardSidebar from '../components/DashboardSidebar'
import {
    ChevronRight,
    ChevronDown,
    Code2,
    Sparkles,
    Download
} from 'lucide-react'

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <ChevronRight size={16} />
                </span>
            </div>
            {item.tags && item.tags.length > 0 && (
                <div className='q-card__tags'>
                    {item.tags.map((tag, i) => (
                        <span key={i} className='q-card__category-tag'>{tag}</span>
                    ))}
                </div>
            )}
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf, setIsFeatureModalOpen } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])

    if (loading || !report) {
        return (
            <Loading />
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    const handleNotAvailable = () => {
        setIsFeatureModalOpen(true);
    };

    return (
        <div className='dashboard-container'>
            {/* Shared Sidebar */}
            <DashboardSidebar
                reportId={interviewId}
                onDownloadResume={getResumePdf}
            />

            {/* Main Content */}
            <main className='interview-main'>
                {/* Breadcrumb wrapper with Mobile Download Button */}
                <div className='interview-breadcrumb-wrapper'>
                    <div className='interview-breadcrumb'>
                        <span className='breadcrumb-link' onClick={() => navigate('/dashboard')}>Plans</span>
                        <ChevronRight size={14} />
                        <span className='breadcrumb-current'>
                            Executive Report: {report.title || 'Untitled Position'}
                        </span>
                    </div>
                    <button 
                        className="mobile-download-btn"
                        onClick={() => getResumePdf(interviewId)}
                    >
                        <Download size={14} />
                        <span>Download Resume</span>
                    </button>
                </div>

                {/* Two-column content layout */}
                <div className='interview-content-grid'>
                    {/* Left: Header + Questions */}
                    <div className='interview-primary'>
                        {/* Report Header Card */}
                        <div className='report-header-card'>
                            <div className='report-header-left'>
                                <div className={`score-ring ${scoreColor}`}>
                                    <span className='score-ring__value'>{report.matchScore}</span>
                                    <span className='score-ring__label'>MATCH SCORE</span>
                                </div>
                            </div>
                            <div className='report-header-right'>
                                <span className={`match-pill ${scoreColor}`}>
                                    {report.matchScore >= 80 ? 'STRONG MATCH' : report.matchScore >= 60 ? 'GOOD MATCH' : 'NEEDS WORK'}
                                </span>
                                <span className='prepared-by'>Prepared by AI Coach</span>
                                <h1 className='report-title'>{report.title || 'Untitled Position'}</h1>
                                <p className='report-summary'>
                                    Based on your background and the specific requirements for this role,
                                    {report.matchScore >= 80 ? ' you are a strong candidate.' : ' focus on bridging the identified skill gaps.'}
                                    {' '}Focus on articulating your experience with the key areas highlighted below.
                                </p>
                            </div>
                        </div>

                        {/* Section Tabs */}
                        <div className='section-tabs'>
                            <button
                                className={`section-tab ${activeNav === 'technical' ? 'active' : ''}`}
                                onClick={() => setActiveNav('technical')}
                            >
                                <Code2 size={16} />
                                Technical Questions
                                <span className='tab-count'>{report.technicalQuestions.length}</span>
                            </button>
                            <button
                                className={`section-tab ${activeNav === 'behavioral' ? 'active' : ''}`}
                                onClick={() => setActiveNav('behavioral')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                                Behavioral Questions
                                <span className='tab-count'>{report.behavioralQuestions.length}</span>
                            </button>
                            <button
                                className={`section-tab ${activeNav === 'roadmap' ? 'active' : ''}`}
                                onClick={() => setActiveNav('roadmap')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                                Road Map
                                <span className='tab-count'>{report.preparationPlan.length} days</span>
                            </button>
                        </div>

                        {/* Content Sections */}
                        <div className='section-content'>
                            {activeNav === 'technical' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>
                                            <Code2 size={18} />
                                            Technical Questions
                                        </h2>
                                        <span className='content-header__count'>
                                            {report.technicalQuestions.filter(q => q.priority === 'high' || q.tags?.includes('HIGH IMPACT')).length || report.technicalQuestions.length} High-Priority Questions
                                        </span>
                                    </div>
                                    <div className='q-list'>
                                        {report.technicalQuestions.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'behavioral' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>Behavioral Questions</h2>
                                        <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                                    </div>
                                    <div className='q-list'>
                                        {report.behavioralQuestions.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'roadmap' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>Preparation Road Map</h2>
                                        <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                                    </div>
                                    <div className='roadmap-list'>
                                        {report.preparationPlan.map((day) => (
                                            <RoadMapDay key={day.day} day={day} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right: Skill Gaps Sidebar */}
                    <aside className='interview-aside'>
                        {/* Skill Gaps Card */}
                        <div className='aside-card'>
                            <div className='aside-card__header'>
                                <h3>Skill Gaps</h3>
                            </div>
                            <div className='skill-gaps-grouped'>
                                {['high', 'medium', 'low'].map(severity => {
                                    const gaps = report.skillGaps.filter(g => g.severity === severity)
                                    if (gaps.length === 0) return null
                                    return (
                                        <div key={severity} className='skill-group'>
                                            <span className={`skill-group__label skill-group__label--${severity}`}>
                                                {severity === 'high' ? 'HIGH PRIORITY' :
                                                    severity === 'medium' ? 'MEDIUM PRIORITY' : 'NICE TO HAVE'}
                                            </span>
                                            <div className='skill-group__tags'>
                                                {gaps.map((gap, i) => (
                                                    <span key={i} className={`skill-pill skill-pill--${severity}`}>
                                                        <span className='skill-pill__dot'></span>
                                                        {gap.skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className='generate-study-btn' onClick={handleNotAvailable}>
                                <Sparkles size={14} />
                                Generate Study Plan
                            </button>
                        </div>

                        {/* Related Content Card */}
                        <div className='aside-card'>
                            <div className='aside-card__header'>
                                <h3>Related Content</h3>
                            </div>
                            <div className='related-links'>
                                <a href='#' className='related-link' onClick={(e) => { e.preventDefault(); handleNotAvailable(); }}>
                                    <span>Job Description</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </a>
                                <a href='#' className='related-link' onClick={(e) => { e.preventDefault(); handleNotAvailable(); }}>
                                    <span>Your Resume</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    )
}

export default Interview