import { useState } from "react";
import { sidebarSections } from "../../data/docsData";

const DocsSidebar = () => {
  const [activeItem, setActiveItem] = useState("getting-started");

  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
        {sidebarSections.map((section) => (
          <div className="sidebar-group" key={section.id}>
            <h3
              className={`sidebar-group-label ${
                section.id === "documentation" ? "sidebar-group-label--primary" : ""
              }`}
            >
              {section.label}
            </h3>

            <ul className="sidebar-list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href="#"
                    className={`sidebar-link ${
                      activeItem === item.id ? "sidebar-link--active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.id);
                    }}
                  >
                    <span className="material-symbols-outlined sidebar-icon">
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DocsSidebar;
