import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades the footer's columns up into place, staggered left to right, the
 * first time the footer enters the viewport. Runs once — a footer is the
 * end of the page, not something worth re-triggering on scroll-back.
 *
 * @param {React.RefObject} footerRef   the <footer> element, used as trigger
 * @param {React.MutableRefObject} columnRefs  ref holding an array of column DOM nodes
 */
export function useFooterReveal(footerRef, columnRefs) {
  useLayoutEffect(() => {
    const footer = footerRef.current;
    const columns = columnRefs.current;

    if (!footer || columns.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(columns, { opacity: 0, y: 20 });

      gsap.to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: footer,
          start: "top 92%",
          once: true,
        },
      });
    }, footer);

    return () => ctx.revert();
  }, [footerRef, columnRefs]);
}