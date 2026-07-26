import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Runs every time Login or Register mounts (i.e. every switch between
 * them, since only the Outlet content remounts, not the layout shell).
 *
 * Dev-mode note: React Strict Mode double-invokes effects (mount ->
 * cleanup -> mount) on every fresh mount, dev-only. useGSAP handles the
 * common version of that race, but a timeline with several chained
 * .from() calls can still occasionally lose one of its "from" values
 * to the timing gap between the first mount's cleanup and the second
 * mount's setup. The clearProps + failsafe below make that impossible
 * to see: even in the worst-case timing, everything is forced back to
 * fully visible shortly after. None of this affects production builds,
 * since Strict Mode's double-invoke only happens in dev.
 */
export function useAuthFormReveal(refs) {
  const { heading, fields, submit } = refs;

  useGSAP(
    () => {
      if (!heading?.current) return;

      const targets = [heading.current, ...(fields.current || []), submit.current].filter(Boolean);

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', overwrite: 'auto' },
        onComplete: () => gsap.set(targets, { clearProps: 'opacity,transform' }),
      });

      tl.from(heading.current, { y: 10, opacity: 0, duration: 0.35 })
        .from(fields.current, { y: 10, opacity: 0, duration: 0.3, stagger: 0.06 }, '-=0.2')
        .from(submit.current, { y: 10, opacity: 0, duration: 0.3 }, '-=0.15');

      // failsafe: whatever GSAP/Strict-Mode timing did, guarantee full
      // visibility shortly after mount no matter what.
      const failsafe = setTimeout(() => {
        gsap.set(targets, { clearProps: 'opacity,transform' });
      }, 900);

      return () => clearTimeout(failsafe);
    },
    { scope: heading, dependencies: [] }
  );
}