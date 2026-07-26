import React, { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import DashboardPreview from "./components/DashboardPreview";
import { useHeroTimeline } from "./hooks/useHeroTimeline";
import styles from "./Hero.module.scss";

const Hero = () => {
  const refs = {
    badge: useRef(null),
    heading: useRef(null),
    paragraph: useRef(null),
    actions: useRef(null),
    dashboard: useRef(null),
    ring1: useRef(null),
    ring2: useRef(null),
    score1: useRef(null),
    score2: useRef(null),
    skillsContainer: useRef(null),
    status: useRef(null),
  };

  useHeroTimeline(refs);

  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={refs.badge} className={styles.badge}>
            <Sparkles size={14} />
            AI Resume &amp; Interview Coach
            <span className={styles.badgeDot} />
          </div>

          <h1 ref={refs.heading} className={styles.title}>
            Build the career <span>you deserve.</span>
          </h1>

          <p ref={refs.paragraph} className={styles.subtitle}>
            Create ATS-friendly resumes, practice real interviews, and identify skill
            gaps with AI that helps you land your next opportunity faster.
          </p>

          <div ref={refs.actions} className={styles.actions}>
            <Link to="/register" className={styles.primaryButton}>
              Get Started
              <ArrowRight size={18} />
            </Link>

            <button className={styles.secondaryButton} type="button">
              <Play size={16} />
              Watch Demo
            </button>
          </div>
        </div>

        <div className={styles.showcase}>
          <DashboardPreview
            dashboardRef={refs.dashboard}
            ring1Ref={refs.ring1}
            ring2Ref={refs.ring2}
            score1Ref={refs.score1}
            score2Ref={refs.score2}
            skillsContainerRef={refs.skillsContainer}
            statusRef={refs.status}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
