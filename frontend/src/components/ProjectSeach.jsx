import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectSearch = () => {
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useState({
    category: "",
    location: "",
    sort: "",
  });

  const [error, setError] = useState("");

  // ดึงข้อมูลโปรเจกต์
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/projects", {
        params: searchParams,
      });
      setProjects(response.data);
      setError(""); // Clear error
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setError("No projects found. Please try again.");
    }
  };

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  useEffect(() => {
    fetchProjects(); // ดึงข้อมูลครั้งแรก
  }, []);

  return (
    <div>
      <h1>Search Projects</h1>
      {/* Filter Form */}
      <div>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={searchParams.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={searchParams.location}
          onChange={handleChange}
        />
        <select name="sort" onChange={handleChange} value={searchParams.sort}>
          <option value="">Sort by</option>
          <option value="fundsRaised">Funds Raised</option>
          <option value="goal">Closest to Goal</option>
          <option value="newest">Newest</option>
        </select>
        <button onClick={fetchProjects}>Search</button>
      </div>

      {/* Results */}
      <div>
        {error && <p>{error}</p>}
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.project_id}>
                <h3>{project.title}</h3>
                <p>Location: {project.address_project}</p>
                <p>Category: {project.category}</p>
                <p>Funds Raised: ${project.total_donations}</p>
                <p>Goal: ${project.goal}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectSearch;
