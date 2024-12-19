import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ProjectPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // Default sort option

  // Fetch projects based on the selected sort option
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/projects?sort=${sortOption}`
        );
        setProjects(response.data); // Set the sorted projects
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        alert("Failed to fetch projects.");
      }
    };

    fetchProjects();
  }, [sortOption]); // Refetch when sortOption changes

  return (
    <div className="projects-page">
      <div className="search-and-projects">
        {/* Search Sidebar */}
        <aside className="search-sidebar">
          <h3>Sort Projects</h3>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="fundsRaised"
                  checked={sortOption === "fundsRaised"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Funds Raised
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="closestTogoal"
                  checked={sortOption === "closestTogoal"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Closest to Goal
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={sortOption === "newest"}
                  onChange={(e) => setSortOption(e.target.value)}
                />
                Newest
              </label>
            </li>
          </ul>
        </aside>

        {/* Project Cards */}
        <div className="project-cards">
          <h2>Donate to Project</h2>
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <img src={`http://localhost:5000/${project.image}`} alt={project.title} />
              <div className="project-info">
                <h4>{project.title}</h4>
                <p>
                  {`$${project.total_donations} raised of $${project.goal} goal`}
                </p>
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
