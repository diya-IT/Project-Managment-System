import React from 'react';

export default function ProjectCard({ name, summary }) {
  return (
    <div className="project-card">
      <h3>{name}</h3>
      <p>{summary}</p>
    </div>
  );
}
