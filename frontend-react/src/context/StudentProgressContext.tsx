import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  checkBackendHealth,
  fetchStudentProgress,
  resetBackendProgress,
  loadDemoBackendProgress,
  toggleBackendTask,
  toggleBackendResumeStep,
  solveBackendProblem,
  syncStudentProgress,
} from '../services/api';

export interface StudentProgressState {
  overallProgress: number;
  practiceDone: number;
  projectsBuilt: number;
  streakDays: number;
  webDevProgress: number;
  dsaProgress: number;
  jsProgress: number;
  reactProgress: number;
  pythonProgress: number;
  sqlProgress: number;
  problemsSolved: number;
  accuracyPercent: number;
  practiceStreak: number;
  tasks: Array<{ id: number; text: string; done: boolean }>;
  resumeSteps: Array<{ title: string; completed: boolean }>;
  recentMock: { title: string; date: string; score: number } | null;
  student?: {
    id?: number;
    name: string;
    email: string;
    institution: string;
    track: string;
  };
}

export const INITIAL_ZERO_STATE: StudentProgressState = {
  overallProgress: 0,
  practiceDone: 0,
  projectsBuilt: 0,
  streakDays: 0,
  webDevProgress: 0,
  dsaProgress: 0,
  jsProgress: 0,
  reactProgress: 0,
  pythonProgress: 0,
  sqlProgress: 0,
  problemsSolved: 0,
  accuracyPercent: 0,
  practiceStreak: 0,
  tasks: [
    { id: 1, text: 'Solve 5 DSA problems', done: false },
    { id: 2, text: 'Complete React module', done: false },
    { id: 3, text: 'Update your resume', done: false },
  ],
  resumeSteps: [
    { title: 'Add Personal Details', completed: false },
    { title: 'Add Education', completed: false },
    { title: 'Add Skills', completed: false },
    { title: 'Add Projects', completed: false },
    { title: 'Review & Download', completed: false },
  ],
  recentMock: null,
};

export const DEMO_SAMPLE_STATE: StudentProgressState = {
  overallProgress: 56,
  practiceDone: 24,
  projectsBuilt: 3,
  streakDays: 15,
  webDevProgress: 72,
  dsaProgress: 40,
  jsProgress: 60,
  reactProgress: 40,
  pythonProgress: 65,
  sqlProgress: 55,
  problemsSolved: 180,
  accuracyPercent: 58,
  practiceStreak: 12,
  tasks: [
    { id: 1, text: 'Solve 5 DSA problems', done: true },
    { id: 2, text: 'Complete React module', done: false },
    { id: 3, text: 'Update your resume', done: false },
  ],
  resumeSteps: [
    { title: 'Add Personal Details', completed: true },
    { title: 'Add Education', completed: true },
    { title: 'Add Skills', completed: true },
    { title: 'Add Projects', completed: true },
    { title: 'Review & Download', completed: false },
  ],
  recentMock: {
    title: 'DSA Mock Interview',
    date: 'Oct 30, 2026',
    score: 78,
  },
};

const STORAGE_KEY = 'exammate_student_progress_v1';

interface StudentProgressContextType {
  stats: StudentProgressState;
  backendConnected: boolean;
  isSyncing: boolean;
  resetAllProgress: () => void;
  loadDemoProgress: () => void;
  toggleTask: (id: number) => void;
  toggleResumeStep: (index: number) => void;
  solveProblem: () => void;
  updateCourseProgress: (courseKey: 'webDevProgress' | 'dsaProgress' | 'jsProgress' | 'reactProgress' | 'pythonProgress' | 'sqlProgress', val: number) => void;
  refreshFromBackend: () => Promise<void>;
}

const StudentProgressContext = createContext<StudentProgressContextType | undefined>(undefined);

export const StudentProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<StudentProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_ZERO_STATE;
  });

  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Check backend health and sync on initial load
  const refreshFromBackend = useCallback(async () => {
    setIsSyncing(true);
    try {
      const health = await checkBackendHealth();
      if (health && health.status === 'healthy') {
        setBackendConnected(true);
        const remoteProgress = await fetchStudentProgress();
        if (remoteProgress) {
          setStats(remoteProgress);
        }
      } else {
        setBackendConnected(false);
      }
    } catch {
      setBackendConnected(false);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  const resetAllProgress = async () => {
    setStats(INITIAL_ZERO_STATE);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ZERO_STATE));
    } catch {}

    if (backendConnected) {
      setIsSyncing(true);
      try {
        const remote = await resetBackendProgress();
        if (remote) setStats(remote);
      } catch {
        // fallback to local
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const loadDemoProgress = async () => {
    setStats(DEMO_SAMPLE_STATE);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_SAMPLE_STATE));
    } catch {}

    if (backendConnected) {
      setIsSyncing(true);
      try {
        const remote = await loadDemoBackendProgress();
        if (remote) setStats(remote);
      } catch {
        // fallback
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const toggleTask = async (id: number) => {
    // Optimistic update
    setStats(prev => {
      const newTasks = prev.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
      const isNowDone = newTasks.find(t => t.id === id)?.done;
      const overall = Math.min(100, Math.max(0, prev.overallProgress + (isNowDone ? 5 : -5)));
      return {
        ...prev,
        tasks: newTasks,
        overallProgress: overall,
      };
    });

    if (backendConnected) {
      try {
        const remote = await toggleBackendTask(id);
        if (remote) setStats(remote);
      } catch {}
    }
  };

  const toggleResumeStep = async (index: number) => {
    // Optimistic update
    setStats(prev => {
      const newSteps = [...prev.resumeSteps];
      if (newSteps[index]) {
        newSteps[index] = { ...newSteps[index], completed: !newSteps[index].completed };
      }
      return { ...prev, resumeSteps: newSteps };
    });

    if (backendConnected) {
      try {
        const remote = await toggleBackendResumeStep(index);
        if (remote) setStats(remote);
      } catch {}
    }
  };

  const solveProblem = async () => {
    // Optimistic update
    setStats(prev => ({
      ...prev,
      problemsSolved: prev.problemsSolved + 1,
      practiceDone: prev.practiceDone + 1,
      streakDays: Math.max(1, prev.streakDays),
      practiceStreak: prev.practiceStreak + 1,
      overallProgress: Math.min(100, prev.overallProgress + 2),
      accuracyPercent: prev.accuracyPercent === 0 ? 100 : Math.round((prev.accuracyPercent + 100) / 2),
    }));

    if (backendConnected) {
      try {
        const remote = await solveBackendProblem();
        if (remote) setStats(remote);
      } catch {}
    }
  };

  const updateCourseProgress = async (
    courseKey: 'webDevProgress' | 'dsaProgress' | 'jsProgress' | 'reactProgress' | 'pythonProgress' | 'sqlProgress',
    val: number
  ) => {
    const clamped = Math.min(100, Math.max(0, val));
    setStats(prev => {
      const nextState = {
        ...prev,
        [courseKey]: clamped,
      };
      if (backendConnected) {
        syncStudentProgress(nextState);
      }
      return nextState;
    });
  };

  return (
    <StudentProgressContext.Provider
      value={{
        stats,
        backendConnected,
        isSyncing,
        resetAllProgress,
        loadDemoProgress,
        toggleTask,
        toggleResumeStep,
        solveProblem,
        updateCourseProgress,
        refreshFromBackend,
      }}
    >
      {children}
    </StudentProgressContext.Provider>
  );
};

export const useStudentProgress = () => {
  const context = useContext(StudentProgressContext);
  if (!context) {
    throw new Error('useStudentProgress must be used within a StudentProgressProvider');
  }
  return context;
};
