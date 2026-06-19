import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutValues from "../components/about/AboutValues";
import AboutTeam from "../components/about/AboutTeam";
import AboutStats from "../components/about/AboutStats";

import "../style/about.scss";

const AboutUs = () => {
  return (
    <div className="about-page">
      <LandingNavbar />
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutStats />
      <Footer />
    </div>
  );
};

export default AboutUs;
