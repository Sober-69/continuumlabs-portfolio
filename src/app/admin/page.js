'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/Admin/ProtectedRoute';
import ProjectForm from '@/components/Admin/ProjectForm';
import ProjectList from '@/components/Admin/ProjectList';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const router = useRouter();

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <ProjectForm
                project={editingProject}
                onSuccess={() => {
                  setEditingProject(null);
                  fetchProjects();
                }}
                onCancel={() => setEditingProject(null)}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
              <ProjectList
                projects={projects}
                onEdit={setEditingProject}
                onDelete={fetchProjects}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
