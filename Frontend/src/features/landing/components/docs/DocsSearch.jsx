const DocsSearch = () => {
  return (
    <div className="docs-search">
      <span className="material-symbols-outlined docs-search-icon">search</span>
      <input
        className="docs-search-input"
        type="text"
        placeholder="Search documentation, components, and APIs..."
      />
    </div>
  );
};

export default DocsSearch;
