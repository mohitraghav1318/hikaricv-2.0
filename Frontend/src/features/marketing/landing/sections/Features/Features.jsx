import { FileText, MessageSquare, BarChart3, Map, ArrowRight } from "lucide-react";

import { useInView } from "./hooks/useInView";
import styles from "./Features.module.scss";

const SKILL_GAPS = [
  { label: "System Design", level: 42 },
  { label: "Node.js", level: 78 },
];

const ROADMAP_STEPS = ["Optimize Resume", "Mock Behavioral", "Negotiate Offer"];

const RevealCard = ({ className = "", delay = 0, children }) => {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className} ${isInView ? styles.inView : ""}`}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.sectionTitle}>
        <span className={styles.eyebrow}>Features</span>
        <h2>Tools Built for Your Success</h2>
        <p>Everything you need to navigate the modern job market with confidence.</p>
      </div>

      <div className={styles.featuresGrid}>
        {/* Resume */}
        <RevealCard className={styles.resumeCard}>
          <div className={styles.featureInfo}>
            <div className={styles.icon}>
              <FileText size={22} />
            </div>
            <h3>AI Resume Builder</h3>
            <p>
              Create ATS-friendly resumes in minutes with intelligent formatting and
              content suggestions.
            </p>
          </div>

          <div className={styles.resumePreview}>
            <img src="/landing/resume-preview.png" alt="Resume preview" />
          </div>
        </RevealCard>

        {/* Interview */}
        <RevealCard className={styles.interviewCard} delay={100}>
          <div className={styles.icon}>
            <MessageSquare size={22} />
          </div>
          <h3>Mock Interviews</h3>
          <p>Practice technical and behavioral interviews with instant AI feedback.</p>

          <div className={styles.progress}>
            <div className={styles.bar} />
          </div>
          <span className={styles.progressLabel}>
            <strong>75%</strong> Improvement Rate
          </span>
        </RevealCard>

        {/* Skill Gap */}
        <RevealCard className={styles.skillCard} delay={180}>
          <div className={styles.icon}>
            <BarChart3 size={22} />
          </div>
          <h3>Skill Gap Analysis</h3>
          <p>Identify what's missing and get actionable steps to bridge the gap.</p>

          <div className={styles.gapMeters}>
            {SKILL_GAPS.map((skill) => (
              <div key={skill.label} className={styles.gapRow}>
                <span className={styles.gapLabel}>{skill.label}</span>
                <div className={styles.gapTrack}>
                  <div className={styles.gapFill} style={{ "--gap-level": `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </RevealCard>

        {/* Roadmap */}
        <RevealCard className={styles.roadmapCard} delay={260}>
          <div className={styles.left}>
            <div className={styles.icon}>
              <Map size={22} />
            </div>
            <h3>Personalized Roadmaps</h3>
            <p>Step-by-step guides to landing your dream role.</p>

            <button type="button" className={styles.roadmapButton}>
              Start My Roadmap
              <ArrowRight size={16} />
            </button>
          </div>

          <div className={styles.steps}>
            {ROADMAP_STEPS.map((step, index) => (
              <div className={styles.step} key={step}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepLabel}>{step}</span>
              </div>
            ))}
          </div>
        </RevealCard>
      </div>
    </section>
  );
};

export default Features;
