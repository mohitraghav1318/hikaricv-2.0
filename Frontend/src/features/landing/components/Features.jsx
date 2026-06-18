import {
  FileText,
  MessageSquare,
  BarChart3,
  Map,
} from "lucide-react";

import "../style/features.scss";

const Features = () => {
  return (
    <section className="features">

      <div className="section-title">

        <h2>Tools Built for Your Success</h2>

        <p>
          Everything you need to navigate the modern
          job market with confidence.
        </p>

      </div>

      <div className="features-grid">

        {/* Resume */}

        <div className="card resume-card">

          <div className="feature-info">

            <div className="icon">

              <FileText size={22} />

            </div>

            <h3>AI Resume Builder</h3>

            <p>

              Create ATS-friendly resumes in minutes
              with intelligent formatting and
              content suggestions.

            </p>

          </div>

          <div className="resume-preview">

            <img
              src="/landing/resume-preview.png"
              alt="resume"
            />

          </div>

        </div>


        {/* Interview */}

        <div className="card interview-card">

          <div className="icon">

            <MessageSquare size={22} />

          </div>

          <h3>Mock Interviews</h3>

          <p>

            Practice technical and behavioral
            interviews with instant AI feedback.

          </p>

          <div className="progress">

            <div className="bar"></div>

          </div>

          <span>75% Improvement Rate</span>

        </div>


        {/* Skill Gap */}

        <div className="card skill-card">

          <div className="icon">

            <BarChart3 size={22} />

          </div>

          <h3>Skill Gap Analysis</h3>

          <p>

            Identify what's missing and get
            actionable steps to bridge the gap.

          </p>

        </div>


        {/* Roadmap */}

        <div className="card roadmap-card">

          <div className="left">

            <div className="icon">

              <Map size={22} />

            </div>

            <h3>Personalized Roadmaps</h3>

            <p>

              Step-by-step guides to landing your
              dream role.

            </p>

            <button>

              Start My Roadmap

            </button>

          </div>

          <div className="steps">

            <div>1 Optimize Resume</div>

            <div>2 Mock Behavioral</div>

            <div>3 Negotiate Offer</div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Features;