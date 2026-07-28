import { useRef } from 'react';
import styles from './HowItWorks.module.scss';
import { useHowItWorksReveal } from './hooks/useHowItWorksReveal';

const STEPS = [
  {
    id: '01',
    title: 'Upload your resume',
    copy: 'Drop in a PDF or DOCX, or paste it in directly. No template, no reformatting, no setup.',
    tag: '~10 sec',
  },
  {
    id: '02',
    title: 'Hikari scans every line',
    copy: 'ATS compatibility, keyword match, and structure are checked against real job postings, not guesswork.',
    tag: 'Instant',
  },
  {
    id: '03',
    title: 'Fix, refine, apply',
    copy: 'A prioritized fix list and a live score that climbs as you edit, so you know exactly when it is ready to send.',
    tag: 'Ready',
    ready: true,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const scannerRef = useRef(null);
  const stepRefs = useRef(STEPS.map(() => useRef(null))).current;

  useHowItWorksReveal(sectionRef, railRef, scannerRef, stepRefs);

  return (
    <section className={styles.howItWorks} ref={sectionRef}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>The process</span>
        <h2 className={styles.heading}>
          From draft to <span>interview-ready</span>
        </h2>
        <p className={styles.sub}>
          Three passes of the scanner, same resume, a version that actually gets read.
        </p>

        <div className={styles.rail} ref={railRef}>
          <div className={styles.railTrack} />
          <div className={styles.scanner} ref={scannerRef} aria-hidden="true" />

          {STEPS.map((step, i) => (
            <div
              className={`${styles.step} ${step.ready ? styles.stepReady : ''}`}
              key={step.id}
              ref={stepRefs[i]}
            >
              <div className={styles.marker}>
                <span>{step.id}</span>
              </div>
              <div className={styles.content}>
                <div className={styles.contentHead}>
                  <h3>{step.title}</h3>
                  <span className={styles.tag}>{step.tag}</span>
                </div>
                <p>{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
