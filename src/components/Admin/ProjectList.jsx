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
    if (res.ok) onDelete();
    setDeleting(null);
  };

  return (
    <div className="glass rounded-xl p-6 space-y-3 max-h-[500px] overflow-y-auto">
      {projects.map((project) => (
        <div key={project.id} className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {/* Icon */}
                {project.icon && (
                  <div className="text-2xl">
                    {project.icon.startsWith('http') ? (
                      <img src={project.icon} alt={project.title} className="w-8 h-8 rounded object-cover" />
                    ) : (
                      <span>{project.icon}</span>
                    )}
                  </div>
                )}
                <h3 className="font-semibold text-white">{project.title}</h3>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech?.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
              {/* Download link indicator */}
              {project.downloadLink && (
                <div className="mt-1 text-xs text-green-400">✓ Download available</div>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(project)}
                className="px-3 py-1 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={deleting === project.id}
                className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-all disabled:opacity-50"
              >
                {deleting === project.id ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
      {projects.length === 0 && (
        <p className="text-gray-400 text-center py-8">No projects yet. Add your first one!</p>
      )}
    </div>
  );
}
