'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/Admin/ProtectedRoute';
import { logout } from '@/lib/auth';
import ProjectForm from '@/components/Admin/ProjectForm';
import ProjectList from '@/components/Admin/ProjectList';

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
      <div className="min-h-screen p-8"
        style={{
          backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 glass rounded-xl p-4">
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <button onClick={handleLogout} 
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">
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
              <h2 className="text-xl font-bold mb-4">Your Projects</h2>
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
