import React from 'react';

export default function TaskCard({ title, description }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
