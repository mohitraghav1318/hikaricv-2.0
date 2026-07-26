import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './CTA.module.scss';
import { useCTAReveal } from './hooks/useCTAReveal';

import { useNavigate } from "react-router";

/**
 * CTA — closing conversion section.
 *
 * Props let this stay reusable across pages while keeping
 * the visual signature (glow + scan sweep) fixed.
 */
export default function CTA({
  eyebrow = 'Ready when you are',
  headline = ['Stop guessing what your resume ', 'should', ' say.'],
  accentWord = 'should',
  sub = 'Upload your resume once and get a clear, ATS-aware read on what to fix — with a coach that explains why, not just what.',
  primaryLabel = 'Get your free review',
  secondaryLabel = 'See how it works',
  meta = 'No credit card. Takes about 2 minutes.',
  onPrimaryClick,
  onSecondaryClick,
}) {
  const section = useRef(null);
  const panel = useRef(null);
  const scan = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);

  useCTAReveal({
    section,
    panel,
    scan,
    eyebrow: eyebrowRef,
    headline: headlineRef,
    sub: subRef,
    actions: actionsRef,
  });


  const navigate = useNavigate();

  return (
    <section className={styles.section} ref={section}>
      <div className={styles.panel} ref={panel}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.scan} ref={scan} aria-hidden="true" />

        <div className={styles.content}>
          <span className={styles.eyebrow} ref={eyebrowRef}>
            {eyebrow}
          </span>

          <h2 className={styles.headline} ref={headlineRef}>
            {headline.map((chunk, i) =>
              chunk === accentWord ? (
                <span className={styles.accent} key={i}>
                  {chunk}
                </span>
              ) : (
                <span key={i}>{chunk}</span>
              )
            )}
          </h2>

          <p className={styles.sub} ref={subRef}>
            {sub}
          </p>

          <div className={styles.actions} ref={actionsRef}>
            <button
              className={styles.primaryBtn}
              onClick={() => {
                onPrimaryClick?.();
                navigate("/login");
              }}
            >
              {primaryLabel}
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>
            <button className={styles.secondaryBtn} onClick={onSecondaryClick}>
              {secondaryLabel}
            </button>
          </div>

          {meta && <p className={styles.meta}>{meta}</p>}
        </div>
      </div>
    </section>
  );
}
