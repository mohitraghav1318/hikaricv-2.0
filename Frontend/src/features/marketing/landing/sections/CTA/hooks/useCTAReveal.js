import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the CTA section's entrance:
 * - panel fades/rises into place
 * - eyebrow, headline, sub, actions stagger in
 * - the signature scan beam sweeps once across the panel
 *
 * refs: { section, panel, scan, eyebrow, headline, sub, actions }
 */
export function useCTAReveal(refs) {
  useLayoutEffect(() => {
    const { section, panel, scan, eyebrow, headline, sub, actions } = refs;
    if (!section?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top 78%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.from(panel.current, {
        y: 36,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          eyebrow.current,
          { y: 12, opacity: 0, duration: 0.5 },
          '-=0.35'
        )
        .from(
          headline.current,
          { y: 18, opacity: 0, duration: 0.6 },
          '-=0.3'
        )
        .from(sub.current, { y: 14, opacity: 0, duration: 0.5 }, '-=0.35')
        .from(
          actions.current,
          { y: 12, opacity: 0, duration: 0.5 },
          '-=0.3'
        )
        .to(
          scan.current,
          {
            left: '120%',
            duration: 1.1,
            ease: 'power2.inOut',
          },
          '-=0.4'
        );
    }, section);

    return () => ctx.revert();
  }, [refs]);
}
