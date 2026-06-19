const missionImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzpxzwSXUtUWJkeZMTgEY70kHuAmJ8hr8RxDOSQT338lsW_rpjlWQkiauCCCopXkNpGNSr6vTfjkAxEUlxm0Vvd_Jv9lF-5D1wev5Ha9aTfge2d8M6mhJ7XGUPBsnK6G5vGu7dnD44kaZilCQz1r7eUJY4g15mWZ7wpmpz27IfvZ_4VVEuzkzdfLSvaUPHPYgdZUAEnZQX4WRJyEyOLsrJjlDG2kcaAHyJmlHZvOPEVCokgZNVm9pxji-EpLn-gCl1ahotu1qQ9duU";

const AboutMission = () => {
  return (
    <section className="about-mission">
      <div className="about-mission-container">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <div className="mission-divider"></div>
          <p>
            To empower 1 billion job seekers with personalized, real-time AI
            guidance that translates raw potential into professional performance.
            We aren't just building software; we're building confidence.
          </p>
        </div>

        <div className="mission-visual">
          <div className="mission-image-wrapper">
            <img
              src={missionImage}
              alt="A professional engaging in a video interview with warm, natural lighting"
            />
            <div className="mission-image-overlay"></div>
            <div className="mission-quote-card">
              <p>
                "Interviewing is a skill, not a personality trait. Everyone
                deserves the tools to master it."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
