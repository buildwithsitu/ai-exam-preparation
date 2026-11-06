export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  roadmapUrl: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  progressPercent: number;
  icon: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  timeComplexity: string;
  pythonSolution: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  tags: string[];
  icon: string;
  highlights: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  institution: string;
  role: string;
  overallProgress: number;
  practiceDone: number;
  projectsBuilt: number;
  streakDays: number;
}
