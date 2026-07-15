// For now, use local storage. Later upgrade to a database
import { initialProjects } from '@/data/projects';

const STORAGE_KEY = 'portfolio_projects';

export const getProjects = () => {
  if (typeof window === 'undefined') {
    return initialProjects;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialProjects;
    }
  }
  // Initialize with initial projects
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
  return initialProjects;
};

export const saveProjects = (projects) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
};
