const DocsFeedback = () => {
  return (
    <section className="docs-feedback">
      <div className="docs-feedback-text">
        <h3>Was this page helpful?</h3>
        <p>Help us improve the developer experience.</p>
      </div>

      <div className="docs-feedback-actions">
        <button className="docs-feedback-btn">
          <span className="material-symbols-outlined">thumb_up</span>
          Yes
        </button>
        <button className="docs-feedback-btn">
          <span className="material-symbols-outlined">thumb_down</span>
          No
        </button>
      </div>
    </section>
  );
};

export default DocsFeedback;
