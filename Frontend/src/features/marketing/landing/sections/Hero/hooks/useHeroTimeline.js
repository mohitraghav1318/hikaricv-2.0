import { useEffect } from "react";
import gsap from "gsap";

const STATUS_MESSAGES = [
  "Analyzing resume...",
  "Matching job description...",
  "Generating interview questions...",
  "Analysis complete",
];

const SCORES = { resume: 96, ats: 92 };

/**
 * Orchestrates the hero load-in sequence: copy reveal, dashboard reveal,
 * score-ring fill, and the status line "typing" through its messages.
 * Respects prefers-reduced-motion by snapping straight to the end state.
 *
 * @param {Object} refs - refs for every animated node, see Hero.jsx
 */
export const useHeroTimeline = (refs) => {
  useEffect(() => {
    const {
      badge,
      heading,
      paragraph,
      actions,
      dashboard,
      ring1,
      ring2,
      score1,
      score2,
      skillsContainer,
      status,
    } = refs;

    const mm = gsap.matchMedia();

    mm.add(
      { reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        const { reduced } = context.conditions;

        const ring1Length = ring1.current.getTotalLength();
        const ring2Length = ring2.current.getTotalLength();
        const ring1Target = ring1Length * (1 - SCORES.resume / 100);
        const ring2Target = ring2Length * (1 - SCORES.ats / 100);

        if (reduced) {
          gsap.set([badge.current, heading.current, paragraph.current, actions.current, dashboard.current], {
            y: 0,
            opacity: 1,
          });
          gsap.set(skillsContainer.current.children, { y: 0, opacity: 1 });
          gsap.set(ring1.current, { strokeDashoffset: ring1Target });
          gsap.set(ring2.current, { strokeDashoffset: ring2Target });
          score1.current.textContent = SCORES.resume;
          score2.current.textContent = SCORES.ats;
          status.current.textContent = STATUS_MESSAGES[STATUS_MESSAGES.length - 1];
          return;
        }

        const scoreProxy1 = { value: 0 };
        const scoreProxy2 = { value: 0 };

        gsap.set([badge.current, heading.current, paragraph.current, actions.current], { y: 22, opacity: 0 });
        gsap.set(dashboard.current, { y: 32, opacity: 0 });
        gsap.set(skillsContainer.current.children, { y: 16, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(badge.current, { y: 0, opacity: 1, duration: 0.6 })
          .to(heading.current, { y: 0, opacity: 1, duration: 0.8 }, "<0.1")
          .to(paragraph.current, { y: 0, opacity: 1, duration: 0.8 }, "<0.15")
          .to(actions.current, { y: 0, opacity: 1, duration: 0.8 }, "<0.15")
          .to(dashboard.current, { y: 0, opacity: 1, duration: 0.7 }, "<0.2")
          .to(ring1.current, { strokeDashoffset: ring1Target, duration: 1.3, ease: "power2.out" }, "rings")
          .to(ring2.current, { strokeDashoffset: ring2Target, duration: 1.3, ease: "power2.out" }, "rings")
          .to(
            scoreProxy1,
            {
              value: SCORES.resume,
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                if (!score1.current) return;
                score1.current.textContent = Math.round(scoreProxy1.value);
              },
            },
            "rings"
          )
          .to(
            scoreProxy2,
            {
              value: SCORES.ats,
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                if (!score2.current) return;
                score2.current.textContent = Math.round(scoreProxy2.value);
              },
            },
            "rings"
          )
          .to(
            skillsContainer.current.children,
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            "rings+=0.5"
          )
          .add("status", "rings+=0.6");

        STATUS_MESSAGES.forEach((message, i) => {
          tl.call(
            () => {
              status.current.textContent = message;
            },
            null,
            i === 0 ? "status" : `status+=${i * 1.4}`
          );
        });

        return () => tl.kill();
      }
    );

    return () => mm.revert();
  }, [refs]);
};
