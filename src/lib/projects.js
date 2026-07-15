import { initialProjects } from '@/data/projects';

const STORAGE_KEY = 'portfolio_projects';

export const getProjects = () => {
  if (typeof window === 'undefined') return initialProjects;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.length > 0) return parsed;
    }
  } catch (error) {
    console.error('Failed to parse projects:', error);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
  return initialProjects;
};

export const saveProjects = (projects) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};
