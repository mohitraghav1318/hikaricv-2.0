import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutValues from "../components/about/AboutValues";
import AboutTeam from "../components/about/AboutTeam";
import AboutStats from "../components/about/AboutStats";
import SEO from "../../../seo/SEO";
import { aboutSEO } from "../../../seo/seoData";

import "../about.scss";

const AboutUs = () => {
  return (
    <div className="about-page">
      <SEO {...aboutSEO} /><AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutStats /></div>
  );
};

export default AboutUs;
