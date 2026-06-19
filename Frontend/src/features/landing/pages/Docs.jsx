import DocsSidebar from "../components/docs/DocsSidebar";
import DocsContent from "../components/docs/DocsContent";

import "../docs.scss";

const Docs = () => {
  return (
    <div className="docs-page"><div className="docs-layout">
        <DocsSidebar />
        <DocsContent />
      </div></div>
  );
};

export default Docs;