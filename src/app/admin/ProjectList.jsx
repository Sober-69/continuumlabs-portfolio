'use client';

import { useState } from 'react';

export default function ProjectList({ projects, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setDeleting(id);
    const res = await fetch('/api/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      onDelete();
    }
    setDeleting(null);
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.description}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(project)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              disabled={deleting === project.id}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
            >
              {deleting === project.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
