import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./Loading.module.scss";

const Loading = ({ progress = null, onComplete }) => {
  const containerRef = useRef(null);
  const scanLineRef = useRef(null);
  const percentRef = useRef(null);
  const dotsRef = useRef(null);
  const glowRef = useRef(null);
  const counter = useRef({ val: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });

      // Glow slow pulse
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Dot grid subtle breathing
      gsap.to(dotsRef.current, {
        opacity: 0.5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scan line sweep
      gsap.fromTo(
        scanLineRef.current,
        { top: "0%" },
        {
          top: "100%",
          duration: 1.4,
          repeat: -1,
          ease: "power1.inOut",
        }
      );

      if (progress === null) {
        gsap.to(counter.current, {
          val: 100,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.textContent = `${Math.round(
                counter.current.val
              )}%`;
            }
          },
          onComplete: () => onComplete?.(),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [progress, onComplete]);

  useLayoutEffect(() => {
    if (progress === null) return;
    gsap.to(counter.current, {
      val: progress,
      duration: 0.4,
      ease: "power1.out",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(
            counter.current.val
          )}%`;
        }
      },
    });
    if (progress >= 100) onComplete?.();
  }, [progress, onComplete]);

  return (
    <div className={styles.loadingContainer} ref={containerRef}>
      <div className={styles.glow} ref={glowRef} />
      <div className={styles.dotGrid} ref={dotsRef} />

      <div className={styles.scanBox}>
        <span className={styles.scanBox__text}>HikariCV</span>
        <div className={styles.scanBox__line} ref={scanLineRef} />
      </div>

      <div className={styles.progressRow}>
        <span className={styles.progressRow__percent} ref={percentRef}>
          0%
        </span>
        <span className={styles.progressRow__label}>Analyzing…</span>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressTrack__fill}
          style={{
            width: progress !== null ? `${progress}%` : undefined,
          }}
        />
      </div>
    </div>
  );
};

export default Loading;