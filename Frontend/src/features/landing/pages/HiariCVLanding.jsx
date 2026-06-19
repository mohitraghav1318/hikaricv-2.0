import React from "react";
import "../landing.scss";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";

import SEO from "../../../seo/SEO";
import { homeSEO } from "../../../seo/seoData";

const HiariCVLanding = () => {
  return (
    <div className="hiaricv-app">
      <SEO {...homeSEO} /><Hero />
      <Features />

      <Testimonials />
      <CTA /></div>
  );
};

export default HiariCVLanding;
