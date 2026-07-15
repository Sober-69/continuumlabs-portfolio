import { NextResponse } from 'next/server';
import { getProjects, saveProjects } from '@/lib/projects';

// GET all projects
export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

// POST new project
export async function POST(request) {
  try {
    const newProject = await request.json();
    const projects = getProjects();
    const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
    newProject.id = maxId + 1;
    projects.push(newProject);
    saveProjects(projects);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

// PUT update project
export async function PUT(request) {
  try {
    const updatedProject = await request.json();
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    projects[index] = updatedProject;
    saveProjects(projects);
    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const projects = getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    if (filteredProjects.length === projects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    saveProjects(filteredProjects);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
