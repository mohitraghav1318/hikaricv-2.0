import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates testimonial cards in with a staggered fade + rise
 * when the section enters the viewport.
 *
 * @param {React.RefObject} sectionRef - ref on the outer <section>
 * @param {React.RefObject} gridRef - ref on the card grid container
 */
export function useTestimonialsReveal(sectionRef, gridRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll("[data-testimonial-card]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 24 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, gridRef]);
}
