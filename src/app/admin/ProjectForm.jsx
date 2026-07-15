'use client';

import { useState, useEffect } from 'react';

export default function ProjectForm({ project, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
    link: '',
    github: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        tags: project.tags?.join(', ') || ''
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    const url = project ? '/api/projects' : '/api/projects';
    const method = project ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project ? { ...data, id: project.id } : data)
    });

    if (res.ok) {
      onSuccess();
      setFormData({ title: '', description: '', tags: '', image: '', link: '', github: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <input
        type="text"
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-3 py-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-3 py-2 border rounded"
        rows="3"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated: React, Node.js, etc.)"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="Live Demo URL"
        value={formData.link}
        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        placeholder="GitHub URL"
        value={formData.github}
        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        className="w-full px-3 py-2 border rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {project ? 'Update Project' : 'Add Project'}
        </button>
        {project && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
