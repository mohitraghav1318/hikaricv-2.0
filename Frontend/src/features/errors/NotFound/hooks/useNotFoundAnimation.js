import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useNotFoundAnimation() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const blobOneRef = useRef(null);
  const blobTwoRef = useRef(null);
  const digitRefs = useRef([]);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const digits = digitRefs.current.filter(Boolean);
      const heading = contentRef.current.querySelector("h1");
      const subtitle = contentRef.current.querySelector("p");
      const buttons = contentRef.current.querySelectorAll("a");

      // Entrance timeline
      gsap.set(digits, { opacity: 0, y: 40, rotateX: -60 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(digits, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
      })
        .from(heading, { opacity: 0, y: 24, duration: 0.5 }, "-=0.3")
        .from(subtitle, { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(
          buttons,
          { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 },
          "-=0.25"
        );

      // Idle floating loop for each digit, desynced so it doesn't feel mechanical
      digits.forEach((digit, i) => {
        gsap.to(digit, {
          y: i % 2 === 0 ? -10 : -6,
          duration: 2.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1 + i * 0.2,
        });
      });

      // Background blobs drifting slowly
      if (blobOneRef.current) {
        gsap.to(blobOneRef.current, {
          x: 40,
          y: 30,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (blobTwoRef.current) {
        gsap.to(blobTwoRef.current, {
          x: -30,
          y: -20,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const handleBtnEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleBtnLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return {
    wrapperRef,
    contentRef,
    blobOneRef,
    blobTwoRef,
    digitRefs,
    handleBtnEnter,
    handleBtnLeave,
  };
}
