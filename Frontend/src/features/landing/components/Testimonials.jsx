import "../style/testimonials.scss";

const testimonials = [
  {
    quote:
      "The mock interview feature was a game-changer. It caught my habit of speaking too fast when nervous.",
    name: "Sarah Jenkins",
    role: "Senior PM @ Google",
    image: "/landing/user1.jpg",
  },

  {
    quote:
      "Skill Gap Analysis showed me exactly what certifications I needed to move from Junior to Senior Developer.",
    name: "David Lin",
    role: "Full-stack Engineer",
    image: "/landing/user2.jpg",
  },
];

const stats = [
  {
    value: "92%",
    label: "Interview success rate",
  },

  {
    value: "3x",
    label: "Faster time to hire",
  },

  {
    value: "15k+",
    label: "Resumes optimized",
  },

  {
    value: "40%",
    label: "Average salary increase",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">

      <div className="testimonials-container">

        {/* LEFT */}

        <div className="left">

          <h2>Why HikariCV?</h2>

          <p>

            We combine cutting-edge AI with industry-standard
            career coaching methodology to give you an unfair
            advantage in the hiring process.

          </p>

          <div className="stats">

            {stats.map((item) => (

              <div className="stat" key={item.label}>

                <h3>{item.value}</h3>

                <span>{item.label}</span>

              </div>

            ))}
          </div>

        </div>

        {/* RIGHT */}

        <div className="right">

          <div className="line"></div>

          {testimonials.map((item, index) => (

            <div
              className={`testimonial-card ${
                index === 1 ? "active" : ""
              }`}
              key={item.name}
            >

              <p className="quote">

                "{item.quote}"

              </p>

              <div className="user">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <h4>{item.name}</h4>

                  <span>{item.role}</span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;