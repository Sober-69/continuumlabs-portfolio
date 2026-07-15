export async function POST(request) {
  try {
    const newProject = await request.json();
    const projects = getProjects();
    const maxId = projects.reduce((max, p) => Math.max(max, p.id), 0);
    const projectWithId = {
      ...newProject,
      id: maxId + 1,
      gradient: newProject.gradient || 'from-cyan-400 to-purple-500',
      tech: newProject.tech || [],
      link: newProject.link || '#',
      icon: newProject.icon || '🚀',
      downloadLink: newProject.downloadLink || ''
    };
    projects.push(projectWithId);
    saveProjects(projects);
    return NextResponse.json(projectWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}
