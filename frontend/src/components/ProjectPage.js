// src/components/ProjectsPage.js
import React from "react";
import "./ProjectPage.css";

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Hurricane Milton Relief Fund",
      image: "https://via.placeholder.com/150",
      description: "Raise of 100,000 goal",
      amount: "$70,000",
    },
    {
      id: 2,
      title: "Hurricane Milton Relief Fund",
      image: "https://via.placeholder.com/150",
      description: "Raise of 100,000 goal",
      amount: "$70,000",
    },
    {
      id: 3,
      title: "Hurricane Milton Relief Fund",
      image: "https://via.placeholder.com/150",
      description: "Raise of 100,000 goal",
      amount: "$70,000",
    },
  ];

  return (
    <div className="projects-page">
      <div className="search-and-projects">
        {/* Search Sidebar */}
        <aside className="search-sidebar">
          <h3>Search For Project</h3>
          <ul>
            <li>
              <label>
                <input type="checkbox" />
                Education
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Physical Health
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Gender Equality
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Economic Growth
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                Justice and Human Rights
              </label>
            </li>
          </ul>
        </aside>

        {/* Project Cards */}
        <div className="project-cards">
          <h2>Donate to Project</h2>
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <strong>{project.amount}</strong>
                <button className="donate-btn">Donate</button>
              </div>
            </div>
          ))}
          <div className="load-more">
            <button className="load-more-btn">Load More Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;