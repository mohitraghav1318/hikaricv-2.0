import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the "scan rail" in HowItWorks: a light travels along the process
 * track as the user scrolls, and each step lights up as the scanner
 * reaches it — the resume literally being scanned, step by step.
 *
 * @param {React.RefObject} sectionRef  section wrapper, used as the trigger
 * @param {React.RefObject} railRef     the track the scanner travels along
 * @param {React.RefObject} scannerRef  the moving light element
 * @param {React.RefObject[]} stepRefs  array of refs, one per step card
 */
export function useHowItWorksReveal(sectionRef, railRef, scannerRef, stepRefs) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    const scanner = scannerRef.current;
    const steps = stepRefs.map((ref) => ref.current).filter(Boolean);

    if (!section || !rail || !scanner || steps.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Skip the travelling light entirely; just settle everything into
        // its "arrived" state so the section still reads correctly.
        gsap.set(steps, { opacity: 1, y: 0 });
        steps.forEach((step) => step.classList.add('is-active'));
        gsap.set(scanner, { autoAlpha: 0 });
        return;
      }

      gsap.set(steps, { opacity: 0, y: 28 });

      const mm = gsap.matchMedia();

      // Every step tween shares this shape — the only thing that changes
      // between steps is *when* it starts. Real duration + an eased curve
      // so the card visibly settles in, instead of popping in a single frame.
      const STEP_DURATION = 0.3; // out of a nominal timeline length of 1
      const addSteps = (tl) => {
        steps.forEach((step, i) => {
          const start = (i / steps.length) * 0.85; // last step starts at ~0.57, not at the very edge
          tl.to(
            step,
            {
              opacity: 1,
              y: 0,
              duration: STEP_DURATION,
              ease: 'power2.out',
              onStart: () => step.classList.add('is-active'),
              onReverseComplete: () => step.classList.remove('is-active'),
            },
            start
          );
        });
      };

      // Desktop: the rail runs horizontally, scanner moves along x.
      mm.add('(min-width: 900px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            // Ends while the section is still comfortably in view, well
            // before the next section starts pulling focus.
            end: 'bottom 85%',
            scrub: 1.2,
          },
        });

        gsap.set(scanner, { left: '0%', top: '' });
        tl.to(scanner, { left: '100%', ease: 'none', duration: 1 }, 0);
        addSteps(tl);

        return () => tl.kill();
      });

      // Mobile: the rail runs vertically, scanner moves along y.
      mm.add('(max-width: 899px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 88%',
            scrub: 1.2,
          },
        });

        gsap.set(scanner, { top: '0%', left: '' });
        tl.to(scanner, { top: '100%', ease: 'none', duration: 1 }, 0);
        addSteps(tl);

        return () => tl.kill();
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, [sectionRef, railRef, scannerRef, stepRefs]);
}