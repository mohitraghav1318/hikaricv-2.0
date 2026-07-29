import React from "react";
import { Brain, Target } from "lucide-react";
import styles from "./DashboardPreview.module.scss";

const RING_RADIUS = 46;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const SKILLS = [{ label: "React" }, { label: "Node.js" }, { label: "Docker" }, { label: "System Design" }];

const ScoreRing = ({ id, ringRef, valueRef, label }) => (
  <div className={styles.scoreCard}>
    <svg className={styles.ring} viewBox="0 0 120 120" role="img" aria-label={label}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b9d" />
          <stop offset="100%" stopColor="#fd2270" />
        </linearGradient>
      </defs>
      <circle className={styles.ringTrack} cx="60" cy="60" r={RING_RADIUS} />
      <circle
        ref={ringRef}
        className={styles.ringFill}
        cx="60"
        cy="60"
        r={RING_RADIUS}
        stroke={`url(#${id})`}
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={RING_CIRCUMFERENCE}
      />
      <text x="60" y="67" textAnchor="middle" className={styles.ringValue}>
        <tspan ref={valueRef}>0</tspan>
        <tspan className={styles.ringPercent}>%</tspan>
      </text>
    </svg>
    <span className={styles.scoreLabel}>{label}</span>
  </div>
);

const DashboardPreview = ({
  dashboardRef,
  ring1Ref,
  ring2Ref,
  score1Ref,
  score2Ref,
  skillsContainerRef,
  statusRef,
}) => {
  return (
    <div ref={dashboardRef} className={styles.dashboard}>
      <div className={styles.scores}>
        <ScoreRing id="resumeRing" ringRef={ring1Ref} valueRef={score1Ref} label="Resume Score" />
        <ScoreRing id="atsRing" ringRef={ring2Ref} valueRef={score2Ref} label="ATS Score" />
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.details}>
        <div className={styles.skills} ref={skillsContainerRef}>
          {SKILLS.map((skill) => (
            <div key={skill.label} className={styles.skill}>
              <Brain size={14} strokeWidth={2} />
              <span>{skill.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.status}>
          <Target size={16} strokeWidth={2} />
          <span className={styles.statusText} ref={statusRef} />
          <span className={styles.cursor} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
