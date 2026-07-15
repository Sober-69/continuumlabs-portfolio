'use client';

import { useState, useEffect } from 'react';

export default function ProjectForm({ project, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    link: '#',
    gradient: 'from-cyan-400 to-purple-500',
    icon: '🚀', // New field
    downloadLink: '' // New field
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        tech: project.tech?.join(', ') || '',
        link: project.link || '#',
        gradient: project.gradient || 'from-cyan-400 to-purple-500',
        icon: project.icon || '🚀',
        downloadLink: project.downloadLink || ''
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean)
    };

    const url = '/api/projects';
    const method = project ? 'PUT' : 'POST';
    if (project) data.id = project.id;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      onSuccess();
      setFormData({ 
        title: '', 
        description: '', 
        tech: '', 
        link: '#', 
        gradient: 'from-cyan-400 to-purple-500',
        icon: '🚀',
        downloadLink: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
      <input
        type="text"
        placeholder="Project Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
        required
      />
      <textarea
        placeholder="Description *"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white resize-none"
        rows="3"
        required
      />
      <input
        type="text"
        placeholder="Tech (comma separated)"
        value={formData.tech}
        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
      />
      
      {/* New: Icon field */}
      <input
        type="text"
        placeholder="Icon (emoji or URL) - e.g., 🚀 or /icons/app.png"
        value={formData.icon}
        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
      />
      
      {/* New: Download link field */}
      <input
        type="text"
        placeholder="Download Link (e.g., https://example.com/download/app)"
        value={formData.downloadLink}
        onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
      />
      
      <input
        type="text"
        placeholder="Live Demo URL"
        value={formData.link}
        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
      />
      <input
        type="text"
        placeholder="Gradient (e.g., from-cyan-400 to-purple-500)"
        value={formData.gradient}
        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none text-white"
      />
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
        >
          {project ? 'Update Project' : 'Add Project'}
        </button>
        {project && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
