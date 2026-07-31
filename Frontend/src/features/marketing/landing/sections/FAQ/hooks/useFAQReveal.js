import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Handles the on-scroll stagger reveal for FAQ items.
 * itemCount is passed so the effect re-runs if the question list length changes.
 */
export default function useFAQReveal(itemCount) {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  // Reset collected refs on every render so unmounted items don't linger.
  itemRefs.current = [];

  const addItemRef = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionRef.current || itemRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(itemRefs.current, { opacity: 0, y: 32 });

      gsap.to(itemRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [itemCount]);

  return { sectionRef, addItemRef };
}
