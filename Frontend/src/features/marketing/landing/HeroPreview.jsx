import Hero from "./sections/Hero";
import Features from "./sections/Features";

import HowItWorks from "./sections/HowItWorks"
import Testimonials from "./sections/Testimonials"
import CTA from "./sections/CTA"

export default function HeroPreview() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}