import { heroContent, bentoCards, steps } from "../../data/docsData";
import DocsSearch from "./DocsSearch";
import DocsFeedback from "./DocsFeedback";

const DocsContent = () => {
  return (
    <main className="docs-main">
      {/* Search */}
      <DocsSearch />

      {/* Breadcrumbs */}
      <nav className="docs-breadcrumbs">
        {heroContent.breadcrumbs.map((crumb, i) => (
          <span key={i} className="docs-breadcrumb-item">
            {i > 0 && (
              <span className="material-symbols-outlined docs-breadcrumb-sep">
                chevron_right
              </span>
            )}
            {crumb.href ? (
              <a href={crumb.href} className="docs-breadcrumb-link">
                {crumb.label}
              </a>
            ) : (
              <span className="docs-breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Hero */}
      <section className="docs-hero">
        <h1>{heroContent.title}</h1>
        <p>{heroContent.description}</p>
      </section>

      {/* Bento Grid */}
      <div className="docs-bento-grid">
        {bentoCards.map((card) => (
          <div className="docs-bento-card" key={card.id}>
            <div className={`docs-bento-icon docs-bento-icon--${card.iconBg}`}>
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a href="#" className="docs-bento-link">
              {card.linkText}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        ))}
      </div>

      {/* Step Guide */}
      <section className="docs-steps">
        <h2>Your First Mock Interview</h2>

        <div className="docs-steps-list">
          {steps.map((step) => (
            <div className="docs-step" key={step.id}>
              <div
                className={`docs-step-number ${
                  step.active ? "docs-step-number--active" : ""
                }`}
              >
                {step.id}
              </div>

              <div className="docs-step-body">
                <h4>{step.title}</h4>
                <p>{step.description}</p>

                {step.code && (
                  <div className="docs-code-block">
                    <code>{step.code}</code>
                  </div>
                )}

                {step.badges.length > 0 && (
                  <div className="docs-badges">
                    {step.badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`docs-badge docs-badge--${badge.variant}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Asset */}
      <section className="docs-visual">
        <div className="docs-visual-wrapper">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbuh535-FqnRoEzjuzpM_iLLVNfz-p3QVb6Llwkz4NzEqXfiDSrj1RLJQPYJO4NcPWSF8yG1KM7EJjXKZ-plqDReBQpBVasfqDRhC2DEiXolSO1GqaFpRRESFWcx_JLgGSzlIN2BxSrVxgguxcSlG1A6f4uPUpS9u04N-ILczoszKjALG88dEWOxFU0S_6a2C_x0MamCU4U3oIzWNQZG-btHPuxn_zYyxyPZHpYcPgvgmoi-4sSeYbHLJ5D484MHY_XEixzfZr_xLH"
            alt="InterviewAI Dashboard showing performance metrics and AI analytics"
          />
        </div>
      </section>

      {/* Feedback */}
      <DocsFeedback />
    </main>
  );
};

export default DocsContent;
