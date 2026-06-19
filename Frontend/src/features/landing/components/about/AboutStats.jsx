import { stats } from "../../data/aboutData";

const AboutStats = () => {
  return (
    <section className="about-stats">
      <div className="about-stats-container">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.id}>
            <div className="stat-value">{stat.value}</div>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
