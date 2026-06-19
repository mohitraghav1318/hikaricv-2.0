import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsContent from "../components/docs/DocsContent";

import "../docs.scss";

const Docs = () => {
  return (
    <div className="docs-page">
      <LandingNavbar />
      <div className="docs-layout">
        <DocsSidebar />
        <DocsContent />
      </div>
      <Footer />
    </div>
  );
};

export default Docs;