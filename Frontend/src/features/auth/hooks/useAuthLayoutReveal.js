import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Runs once when AuthLayout mounts (i.e. once per visit to the auth
 * section) -- NOT on every switch between /login and /register, since
 * the layout itself doesn't unmount when the Outlet content changes.
 *
 * Same clearProps + failsafe pattern as useAuthFormReveal, for the
 * same dev-only Strict-Mode double-invoke reason -- see that file's
 * comment for the full explanation.
 */
export function useAuthLayoutReveal(refs) {
  const { visual, card } = refs;

  useGSAP(
    () => {
      if (!card?.current) return;

      const targets = [visual?.current, card.current].filter(Boolean);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', overwrite: 'auto' },
        onComplete: () => gsap.set(targets, { clearProps: 'opacity,transform' }),
      });

      if (visual?.current) {
        tl.from(visual.current, { opacity: 0, duration: 0.6 }, 0);
      }
      tl.from(card.current, { y: 24, opacity: 0, duration: 0.55 }, 0.1);

      const failsafe = setTimeout(() => {
        gsap.set(targets, { clearProps: 'opacity,transform' });
      }, 900);

      return () => clearTimeout(failsafe);
    },
    { scope: card, dependencies: [] }
  );
}