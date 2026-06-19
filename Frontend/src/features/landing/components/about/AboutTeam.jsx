import { teamMembers } from "../../data/aboutData";

const AboutTeam = () => {
  return (
    <section className="about-team">
      <div className="about-team-container">
        <div className="team-header">
          <div className="team-header-text">
            <h2>The Minds Behind the Mission</h2>
            <p>
              A collection of career coaches, AI researchers, and designers
              committed to changing how the world hires.
            </p>
          </div>
          <button className="join-team-btn">Join Our Team</button>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="team-card-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h4>{member.name}</h4>
              <span className="team-role">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
