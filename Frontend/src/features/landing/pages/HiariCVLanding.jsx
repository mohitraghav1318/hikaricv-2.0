import React from "react";
import "../landing.scss";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";

const HiariCVLanding = () => {
  return (
    <div className="hiaricv-app">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HiariCVLanding;


// const HiariCVLanding = () => {
//   return (
//     <div className="hiaricv-app">
//       
//       
//       
//       
//       
//       
//       <Footer />
//     </div>
//   );
// };

// export default HiariCVLanding;