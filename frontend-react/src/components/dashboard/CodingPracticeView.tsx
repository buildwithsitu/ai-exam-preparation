import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  Layers,
  Database,
  Table,
  Calculator,
  Lightbulb
} from 'lucide-react';
import { useStudentProgress } from '../../context/StudentProgressContext';
import { 
  STRIVERS_STEPS, 
  STRIVERS_A2Z_QUESTIONS, 
  DSAQuestion,
  TOTAL_STRIVERS_PROBLEMS 
} from '../../data/striversA2ZData';
import {
  TOP_SQL_50_SECTIONS,
  TOP_SQL_50_QUESTIONS,
  SQLQuestion,
  TOTAL_SQL_50_PROBLEMS
} from '../../data/topSql50Data';
import {
  INDIABIX_CATEGORIES,
  INDIABIX_APTITUDE_QUESTIONS,
  AptitudeQuestion,
  TOTAL_APTITUDE_PROBLEMS
} from '../../data/indiaBixAptitudeData';

const STORAGE_KEY_DSA = 'exammate_strivers_solved_ids';
const STORAGE_KEY_SQL = 'exammate_sql50_solved_ids';
const STORAGE_KEY_APTITUDE = 'exammate_indiabix_solved_ids';

export const CodingPracticeView: React.FC = () => {
  const { stats, solveProblem } = useStudentProgress();
  const [activeStream, setActiveStream] = useState<'DSA' | 'SQL' | 'Aptitude' | 'Web Dev'>('DSA');

  // -------------------------------------------------------------
  // DSA STATE (Striver's A2Z DSA Sheet)
  // -------------------------------------------------------------
  const [selectedStep, setSelectedStep] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [solvedDsaIds, setSolvedDsaIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DSA);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading solved DSA problems:', e);
    }
    return new Set();
  });

  const [activeModalDsaQuestion, setActiveModalDsaQuestion] = useState<DSAQuestion | null>(null);
  const [activeDsaLanguage, setActiveDsaLanguage] = useState<'python' | 'cpp' | 'java'>('python');
  const [copiedDsaCode, setCopiedDsaCode] = useState(false);

  // -------------------------------------------------------------
  // SQL STATE (LeetCode Top SQL 50 Study Plan)
  // -------------------------------------------------------------
  const [selectedSqlSection, setSelectedSqlSection] = useState<number | 'all'>('all');
  const [selectedSqlDifficulty, setSelectedSqlDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [sqlStatusFilter, setSqlStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [sqlSearchQuery, setSqlSearchQuery] = useState('');

  const [solvedSqlIds, setSolvedSqlIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SQL);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading solved SQL problems:', e);
    }
    return new Set();
  });

  const [activeModalSqlQuestion, setActiveModalSqlQuestion] = useState<SQLQuestion | null>(null);
  const [activeSqlDialect, setActiveSqlDialect] = useState<'mysql' | 'postgresql'>('mysql');
  const [copiedSqlCode, setCopiedSqlCode] = useState(false);

  // -------------------------------------------------------------
  // APTITUDE STATE (IndiaBIX Quantitative Aptitude)
  // -------------------------------------------------------------
  const [selectedAptCategory, setSelectedAptCategory] = useState<number | 'all'>('all');
  const [selectedAptDifficulty, setSelectedAptDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [aptStatusFilter, setAptStatusFilter] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [aptSearchQuery, setAptSearchQuery] = useState('');

  const [solvedAptitudeIds, setSolvedAptitudeIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APTITUDE);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading solved Aptitude problems:', e);
    }
    return new Set();
  });

  const [activeModalAptQuestion, setActiveModalAptQuestion] = useState<AptitudeQuestion | null>(null);

  // Fallback for Web Dev
  const webDevTopics = [
    { name: 'JavaScript ES6+ & TypeScript', count: '45 Q', icon: '⚡' },
    { name: 'React Hooks & State Management', count: '35 Q', icon: '⚛️' },
    { name: 'Node.js & Express REST APIs', count: '30 Q', icon: '🟢' },
    { name: 'System Design & High-Level Architecture', count: '25 Q', icon: '🏗️' },
  ];

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const toggleDsaSolved = (questionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSolvedDsaIds(prev => {
      const next = new Set(prev);
      const isNowSolved = !next.has(questionId);
      if (isNowSolved) {
        next.add(questionId);
        solveProblem();
      } else {
        next.delete(questionId);
      }
      try {
        localStorage.setItem(STORAGE_KEY_DSA, JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Error saving solved DSA problems:', err);
      }
      return next;
    });
  };

  const toggleSqlSolved = (questionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSolvedSqlIds(prev => {
      const next = new Set(prev);
      const isNowSolved = !next.has(questionId);
      if (isNowSolved) {
        next.add(questionId);
        solveProblem();
      } else {
        next.delete(questionId);
      }
      try {
        localStorage.setItem(STORAGE_KEY_SQL, JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Error saving solved SQL problems:', err);
      }
      return next;
    });
  };

  const toggleAptitudeSolved = (questionId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSolvedAptitudeIds(prev => {
      const next = new Set(prev);
      const isNowSolved = !next.has(questionId);
      if (isNowSolved) {
        next.add(questionId);
        solveProblem();
      } else {
        next.delete(questionId);
      }
      try {
        localStorage.setItem(STORAGE_KEY_APTITUDE, JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Error saving solved Aptitude problems:', err);
      }
      return next;
    });
  };

  const handleCopyCode = (code: string, isSql: boolean = false) => {
    navigator.clipboard.writeText(code);
    if (isSql) {
      setCopiedSqlCode(true);
      setTimeout(() => setCopiedSqlCode(false), 2000);
    } else {
      setCopiedDsaCode(true);
      setTimeout(() => setCopiedDsaCode(false), 2000);
    }
  };

  const navigateDsaQuestion = (direction: 'prev' | 'next') => {
    if (!activeModalDsaQuestion) return;
    const currentIndex = STRIVERS_A2Z_QUESTIONS.findIndex(q => q.id === activeModalDsaQuestion.id);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveModalDsaQuestion(STRIVERS_A2Z_QUESTIONS[currentIndex - 1]);
      setCopiedDsaCode(false);
    } else if (direction === 'next' && currentIndex < STRIVERS_A2Z_QUESTIONS.length - 1) {
      setActiveModalDsaQuestion(STRIVERS_A2Z_QUESTIONS[currentIndex + 1]);
      setCopiedDsaCode(false);
    }
  };

  const navigateSqlQuestion = (direction: 'prev' | 'next') => {
    if (!activeModalSqlQuestion) return;
    const currentIndex = TOP_SQL_50_QUESTIONS.findIndex(q => q.id === activeModalSqlQuestion.id);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveModalSqlQuestion(TOP_SQL_50_QUESTIONS[currentIndex - 1]);
      setCopiedSqlCode(false);
    } else if (direction === 'next' && currentIndex < TOP_SQL_50_QUESTIONS.length - 1) {
      setActiveModalSqlQuestion(TOP_SQL_50_QUESTIONS[currentIndex + 1]);
      setCopiedSqlCode(false);
    }
  };

  const navigateAptitudeQuestion = (direction: 'prev' | 'next') => {
    if (!activeModalAptQuestion) return;
    const currentIndex = INDIABIX_APTITUDE_QUESTIONS.findIndex(q => q.id === activeModalAptQuestion.id);
    if (direction === 'prev' && currentIndex > 0) {
      setActiveModalAptQuestion(INDIABIX_APTITUDE_QUESTIONS[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < INDIABIX_APTITUDE_QUESTIONS.length - 1) {
      setActiveModalAptQuestion(INDIABIX_APTITUDE_QUESTIONS[currentIndex + 1]);
    }
  };

  // -------------------------------------------------------------
  // DSA FILTERED QUESTIONS & STATS
  // -------------------------------------------------------------
  const filteredDsaQuestions = useMemo(() => {
    return STRIVERS_A2Z_QUESTIONS.filter(q => {
      if (selectedStep !== 'all' && q.stepId !== selectedStep) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      const isSolved = solvedDsaIds.has(q.id);
      if (statusFilter === 'Solved' && !isSolved) return false;
      if (statusFilter === 'Unsolved' && isSolved) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchStep = q.stepTitle.toLowerCase().includes(query);
        const matchCompany = q.companies.some(c => c.toLowerCase().includes(query));
        if (!matchTitle && !matchTopic && !matchStep && !matchCompany) return false;
      }
      return true;
    });
  }, [selectedStep, selectedDifficulty, statusFilter, searchQuery, solvedDsaIds]);

  const totalDsaSolvedCount = useMemo(() => {
    return STRIVERS_A2Z_QUESTIONS.filter(q => solvedDsaIds.has(q.id)).length;
  }, [solvedDsaIds]);

  const dsaSolvedPercentage = Math.round((totalDsaSolvedCount / TOTAL_STRIVERS_PROBLEMS) * 100) || 0;
  const dsaEasySolved = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Easy' && solvedDsaIds.has(q.id)).length;
  const dsaEasyTotal = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Easy').length;
  const dsaMedSolved = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Medium' && solvedDsaIds.has(q.id)).length;
  const dsaMedTotal = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Medium').length;
  const dsaHardSolved = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Hard' && solvedDsaIds.has(q.id)).length;
  const dsaHardTotal = STRIVERS_A2Z_QUESTIONS.filter(q => q.difficulty === 'Hard').length;

  // -------------------------------------------------------------
  // SQL FILTERED QUESTIONS & STATS
  // -------------------------------------------------------------
  const filteredSqlQuestions = useMemo(() => {
    return TOP_SQL_50_QUESTIONS.filter(q => {
      if (selectedSqlSection !== 'all' && q.sectionId !== selectedSqlSection) return false;
      if (selectedSqlDifficulty !== 'All' && q.difficulty !== selectedSqlDifficulty) return false;
      const isSolved = solvedSqlIds.has(q.id);
      if (sqlStatusFilter === 'Solved' && !isSolved) return false;
      if (sqlStatusFilter === 'Unsolved' && isSolved) return false;
      if (sqlSearchQuery.trim()) {
        const query = sqlSearchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchSection = q.sectionTitle.toLowerCase().includes(query);
        const matchId = String(q.leetcodeId).includes(query);
        const matchCompany = q.companies.some(c => c.toLowerCase().includes(query));
        if (!matchTitle && !matchSection && !matchId && !matchCompany) return false;
      }
      return true;
    });
  }, [selectedSqlSection, selectedSqlDifficulty, sqlStatusFilter, sqlSearchQuery, solvedSqlIds]);

  const totalSqlSolvedCount = useMemo(() => {
    return TOP_SQL_50_QUESTIONS.filter(q => solvedSqlIds.has(q.id)).length;
  }, [solvedSqlIds]);

  const sqlSolvedPercentage = Math.round((totalSqlSolvedCount / TOTAL_SQL_50_PROBLEMS) * 100) || 0;
  const sqlEasySolved = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Easy' && solvedSqlIds.has(q.id)).length;
  const sqlEasyTotal = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Easy').length;
  const sqlMedSolved = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Medium' && solvedSqlIds.has(q.id)).length;
  const sqlMedTotal = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Medium').length;
  const sqlHardSolved = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Hard' && solvedSqlIds.has(q.id)).length;
  const sqlHardTotal = TOP_SQL_50_QUESTIONS.filter(q => q.difficulty === 'Hard').length;

  // -------------------------------------------------------------
  // APTITUDE FILTERED QUESTIONS & STATS
  // -------------------------------------------------------------
  const filteredAptQuestions = useMemo(() => {
    return INDIABIX_APTITUDE_QUESTIONS.filter(q => {
      if (selectedAptCategory !== 'all' && q.categoryId !== selectedAptCategory) return false;
      if (selectedAptDifficulty !== 'All' && q.difficulty !== selectedAptDifficulty) return false;
      const isSolved = solvedAptitudeIds.has(q.id);
      if (aptStatusFilter === 'Solved' && !isSolved) return false;
      if (aptStatusFilter === 'Unsolved' && isSolved) return false;
      if (aptSearchQuery.trim()) {
        const query = aptSearchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchCategory = q.category.toLowerCase().includes(query);
        const matchQuestion = q.question.toLowerCase().includes(query);
        const matchCompany = q.companies.some(c => c.toLowerCase().includes(query));
        if (!matchTitle && !matchTopic && !matchCategory && !matchQuestion && !matchCompany) return false;
      }
      return true;
    });
  }, [selectedAptCategory, selectedAptDifficulty, aptStatusFilter, aptSearchQuery, solvedAptitudeIds]);

  const totalAptSolvedCount = useMemo(() => {
    return INDIABIX_APTITUDE_QUESTIONS.filter(q => solvedAptitudeIds.has(q.id)).length;
  }, [solvedAptitudeIds]);

  const aptSolvedPercentage = Math.round((totalAptSolvedCount / TOTAL_APTITUDE_PROBLEMS) * 100) || 0;
  const aptEasySolved = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Easy' && solvedAptitudeIds.has(q.id)).length;
  const aptEasyTotal = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Easy').length;
  const aptMedSolved = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Medium' && solvedAptitudeIds.has(q.id)).length;
  const aptMedTotal = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Medium').length;
  const aptHardSolved = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Hard' && solvedAptitudeIds.has(q.id)).length;
  const aptHardTotal = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.difficulty === 'Hard').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner & Stream Selector */}
      <div className="bg-surface-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Targeted SDE, SQL & Campus Aptitude &bull; Situ Chandra / JNU</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-content-primary tracking-tight">
              ExamMate AI Practice Hub
            </h1>
            <p className="text-sm text-content-secondary mt-1">
              Official interview preparation sheets: <strong className="text-brand-purple font-semibold">Striver's A2Z DSA</strong>, <strong className="text-indigo-500 font-semibold">LeetCode Top SQL 50</strong>, and <strong className="text-amber-500 font-semibold">IndiaBIX Quantitative Aptitude</strong>.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-xl border border-border">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-content-muted tracking-wider">Streak</p>
                <p className="text-sm font-black text-content-primary">{stats.streakDays} Days</p>
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              {activeStream === 'SQL' ? (
                <Database className="w-5 h-5 text-indigo-500" />
              ) : activeStream === 'Aptitude' ? (
                <Calculator className="w-5 h-5 text-amber-500" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              )}
              <div>
                <p className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                  {activeStream === 'SQL' ? 'SQL Solved' : activeStream === 'Aptitude' ? 'Aptitude' : 'A2Z Solved'}
                </p>
                <p className="text-sm font-black text-content-primary">
                  {activeStream === 'SQL' 
                    ? `${totalSqlSolvedCount} / ${TOTAL_SQL_50_PROBLEMS}`
                    : activeStream === 'Aptitude'
                    ? `${totalAptSolvedCount} / ${TOTAL_APTITUDE_PROBLEMS}`
                    : `${totalDsaSolvedCount} / ${TOTAL_STRIVERS_PROBLEMS}`}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-purple" />
              <div>
                <p className="text-[10px] uppercase font-bold text-content-muted tracking-wider">Progress</p>
                <p className="text-sm font-black text-brand-purple">
                  {activeStream === 'SQL' 
                    ? `${sqlSolvedPercentage}%` 
                    : activeStream === 'Aptitude'
                    ? `${aptSolvedPercentage}%`
                    : `${dsaSolvedPercentage}%`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Streams Tabs */}
        <div className="flex gap-2 border-b border-border mt-6 overflow-x-auto pb-1">
          {(['DSA', 'SQL', 'Aptitude', 'Web Dev'] as const).map((stream) => (
            <button
              key={stream}
              onClick={() => setActiveStream(stream)}
              className={`px-4 py-2 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 ${
                activeStream === stream
                  ? 'border-brand-purple text-brand-purple'
                  : 'border-transparent text-content-secondary hover:text-content-primary hover:border-border'
              }`}
            >
              {stream === 'DSA' 
                ? "Striver's A2Z DSA Sheet" 
                : stream === 'SQL'
                ? "LeetCode Top SQL 50"
                : stream === 'Aptitude'
                ? "IndiaBIX Aptitude"
                : stream}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================= */}
      {/* 1. DSA STREAM (STRIVER'S A2Z DSA SHEET)                      */}
      {/* ============================================================= */}
      {activeStream === 'DSA' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-brand-purple/10 via-purple-500/5 to-indigo-500/10 rounded-2xl p-6 border border-brand-purple/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-brand-purple text-white px-2.5 py-0.5 rounded-full">
                    Official takeUforward Sheet
                  </span>
                  <a 
                    href="https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet?open=none" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-purple hover:underline font-semibold"
                  >
                    <span>takeuforward.org</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="text-xl font-black text-content-primary">
                  Striver's A2Z DSA Preparation Roadmap
                </h2>
                <p className="text-xs sm:text-sm text-content-secondary max-w-2xl leading-relaxed">
                  Sequentially arranged from Step 1 to Step 18. Check off problems as you solve them, and tap on any question to view complete details, optimal approach, time/space complexities, and multi-language solutions.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-emerald-600">Easy</p>
                  <p className="text-lg font-black text-content-primary">{dsaEasySolved} / {dsaEasyTotal}</p>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${dsaEasyTotal ? (dsaEasySolved / dsaEasyTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-amber-600">Medium</p>
                  <p className="text-lg font-black text-content-primary">{dsaMedSolved} / {dsaMedTotal}</p>
                  <div className="w-full bg-amber-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${dsaMedTotal ? (dsaMedSolved / dsaMedTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-rose-600">Hard</p>
                  <p className="text-lg font-black text-content-primary">{dsaHardSolved} / {dsaHardTotal}</p>
                  <div className="w-full bg-rose-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${dsaHardTotal ? (dsaHardSolved / dsaHardTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-content-secondary">Total Sheet Completion</span>
                <span className="text-brand-purple">{totalDsaSolvedCount} of {TOTAL_STRIVERS_PROBLEMS} Questions Solved ({dsaSolvedPercentage}%)</span>
              </div>
              <div className="w-full bg-surface-card rounded-full h-2.5 overflow-hidden border border-border/50">
                <div 
                  className="bg-gradient-to-r from-brand-purple to-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${dsaSolvedPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sequential Step Selector Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-content-muted">
                Navigate Striver's Steps (1 to 18)
              </span>
              <span className="text-xs text-content-secondary">
                {selectedStep === 'all' ? 'Showing all steps' : `Step ${selectedStep} selected`}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedStep('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                  selectedStep === 'all'
                    ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                    : 'bg-surface-card text-content-secondary hover:text-content-primary border-border'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Steps ({TOTAL_STRIVERS_PROBLEMS})</span>
              </button>

              {STRIVERS_STEPS.map((step) => {
                const stepQuestions = STRIVERS_A2Z_QUESTIONS.filter(q => q.stepId === step.id);
                const stepSolved = stepQuestions.filter(q => solvedDsaIds.has(q.id)).length;
                const isSelected = selectedStep === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setSelectedStep(step.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                        : 'bg-surface-card text-content-secondary hover:text-content-primary border-border hover:border-brand-purple/40'
                    }`}
                  >
                    <span>{step.icon}</span>
                    <span>{step.shortTitle}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-subtle text-content-muted'
                    }`}>
                      {stepSolved}/{stepQuestions.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-surface-card rounded-xl p-4 border border-border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question name, topic (e.g. Kadane's, 2Sum), company..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-subtle border border-border text-xs sm:text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand-purple"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Solved', 'Unsolved'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    statusFilter === status
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sequential DSA List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-bold text-content-secondary">
                Showing <span className="text-content-primary font-black">{filteredDsaQuestions.length}</span> questions sequentially
              </p>
              {(selectedStep !== 'all' || selectedDifficulty !== 'All' || statusFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedStep('all');
                    setSelectedDifficulty('All');
                    setStatusFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-brand-purple hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {filteredDsaQuestions.length === 0 ? (
              <div className="bg-surface-card rounded-2xl p-12 text-center border border-border">
                <Code2 className="w-12 h-12 text-content-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-content-primary">No questions match your filter</h3>
                <p className="text-xs text-content-secondary mt-1">Try resetting the difficulty or search query.</p>
              </div>
            ) : (
              filteredDsaQuestions.map((q) => {
                const isSolved = solvedDsaIds.has(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveModalDsaQuestion(q)}
                    className={`group bg-surface-card rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-brand-purple/40 ${
                      isSolved 
                        ? 'border-emerald-500/20 bg-emerald-50/10' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => toggleDsaSolved(q.id, e)}
                        className="mt-0.5 text-content-muted hover:text-brand-purple transition-colors flex-shrink-0"
                        title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                      >
                        {isSolved ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Square className="w-5 h-5 text-content-muted group-hover:text-brand-purple" />
                        )}
                      </button>

                      <span className="text-xs font-mono font-bold text-content-muted pt-0.5 flex-shrink-0">
                        #{String(q.sheetIndex).padStart(2, '0')}
                      </span>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                            isSolved 
                              ? 'text-content-secondary line-through decoration-emerald-500/50' 
                              : 'text-content-primary group-hover:text-brand-purple'
                          }`}>
                            {q.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-content-muted">
                          <span className="inline-flex items-center gap-1 font-semibold text-content-secondary">
                            <span>{q.stepIcon}</span>
                            <span>{q.stepShortTitle}</span>
                          </span>
                          <span>&bull;</span>
                          <span>{q.topic}</span>
                          {q.companies.slice(0, 3).map((comp) => (
                            <span 
                              key={comp} 
                              className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle text-content-muted border border-border"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0">
                      <span className="text-[11px] font-mono text-content-muted px-2 py-0.5 rounded bg-surface-subtle border border-border hidden sm:inline-block">
                        {q.timeComplexity}
                      </span>

                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        q.difficulty === 'Easy' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {q.difficulty}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalDsaQuestion(q);
                        }}
                        className="btn-pill-purple text-xs px-3.5 py-1.5 flex items-center gap-1 group-hover:shadow"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 2. SQL STREAM (LEETCODE TOP SQL 50 STUDY PLAN)               */}
      {/* ============================================================= */}
      {activeStream === 'SQL' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-cyan-500/10 rounded-2xl p-6 border border-indigo-500/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                    Official LeetCode Study Plan
                  </span>
                  <a 
                    href="https://leetcode.com/studyplan/top-sql-50/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline font-semibold"
                  >
                    <span>leetcode.com/studyplan/top-sql-50</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="text-xl font-black text-content-primary">
                  LeetCode Top SQL 50 Study Plan
                </h2>
                <p className="text-xs sm:text-sm text-content-secondary max-w-2xl leading-relaxed">
                  The complete 50 high-frequency SQL interview questions sequentially arranged across 7 core topics: Select, Joins, Aggregations, Grouping, Advanced Joins, Subqueries, and String Functions. Tap any question to view schemas, examples, logic, and full MySQL & PostgreSQL queries.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-emerald-600">Easy</p>
                  <p className="text-lg font-black text-content-primary">{sqlEasySolved} / {sqlEasyTotal}</p>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${sqlEasyTotal ? (sqlEasySolved / sqlEasyTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-amber-600">Medium</p>
                  <p className="text-lg font-black text-content-primary">{sqlMedSolved} / {sqlMedTotal}</p>
                  <div className="w-full bg-amber-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${sqlMedTotal ? (sqlMedSolved / sqlMedTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-rose-600">Hard</p>
                  <p className="text-lg font-black text-content-primary">{sqlHardSolved} / {sqlHardTotal}</p>
                  <div className="w-full bg-rose-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${sqlHardTotal ? (sqlHardSolved / sqlHardTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-content-secondary">Total SQL 50 Progress</span>
                <span className="text-indigo-600">{totalSqlSolvedCount} of {TOTAL_SQL_50_PROBLEMS} Solved ({sqlSolvedPercentage}%)</span>
              </div>
              <div className="w-full bg-surface-card rounded-full h-2.5 overflow-hidden border border-border/50">
                <div 
                  className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${sqlSolvedPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* SQL Section Navigator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-content-muted">
                Navigate SQL Topics (7 Sections)
              </span>
              <span className="text-xs text-content-secondary">
                {selectedSqlSection === 'all' ? 'Showing all sections' : `Section ${selectedSqlSection} selected`}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedSqlSection('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                  selectedSqlSection === 'all'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-surface-card text-content-secondary hover:text-content-primary border-border'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Sections ({TOTAL_SQL_50_PROBLEMS})</span>
              </button>

              {TOP_SQL_50_SECTIONS.map((sec) => {
                const secQuestions = TOP_SQL_50_QUESTIONS.filter(q => q.sectionId === sec.id);
                const secSolved = secQuestions.filter(q => solvedSqlIds.has(q.id)).length;
                const isSelected = selectedSqlSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSqlSection(sec.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-surface-card text-content-secondary hover:text-content-primary border-border hover:border-indigo-400'
                    }`}
                  >
                    <span>{sec.icon}</span>
                    <span>{sec.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-subtle text-content-muted'
                    }`}>
                      {secSolved}/{secQuestions.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-surface-card rounded-xl p-4 border border-border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sqlSearchQuery}
                onChange={(e) => setSqlSearchQuery(e.target.value)}
                placeholder="Search SQL query, table, LeetCode # (e.g. 1757, Joins, Subqueries)..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-subtle border border-border text-xs sm:text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-indigo-500"
              />
              {sqlSearchQuery && (
                <button
                  onClick={() => setSqlSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedSqlDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedSqlDifficulty === diff
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Solved', 'Unsolved'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setSqlStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    sqlStatusFilter === status
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sequential SQL List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-bold text-content-secondary">
                Showing <span className="text-content-primary font-black">{filteredSqlQuestions.length}</span> SQL questions sequentially
              </p>
              {(selectedSqlSection !== 'all' || selectedSqlDifficulty !== 'All' || sqlStatusFilter !== 'All' || sqlSearchQuery) && (
                <button
                  onClick={() => {
                    setSelectedSqlSection('all');
                    setSelectedSqlDifficulty('All');
                    setSqlStatusFilter('All');
                    setSqlSearchQuery('');
                  }}
                  className="text-xs text-indigo-600 hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {filteredSqlQuestions.length === 0 ? (
              <div className="bg-surface-card rounded-2xl p-12 text-center border border-border">
                <Database className="w-12 h-12 text-content-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-content-primary">No SQL problems match your filter</h3>
                <p className="text-xs text-content-secondary mt-1">Try resetting the difficulty or search query.</p>
              </div>
            ) : (
              filteredSqlQuestions.map((q) => {
                const isSolved = solvedSqlIds.has(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveModalSqlQuestion(q)}
                    className={`group bg-surface-card rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-indigo-400 ${
                      isSolved 
                        ? 'border-emerald-500/20 bg-emerald-50/10' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => toggleSqlSolved(q.id, e)}
                        className="mt-0.5 text-content-muted hover:text-indigo-600 transition-colors flex-shrink-0"
                        title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                      >
                        {isSolved ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Square className="w-5 h-5 text-content-muted group-hover:text-indigo-600" />
                        )}
                      </button>

                      <span className="text-xs font-mono font-bold text-content-muted pt-0.5 flex-shrink-0">
                        #{String(q.sheetIndex).padStart(2, '0')}
                      </span>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            LC #{q.leetcodeId}
                          </span>
                          <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                            isSolved 
                              ? 'text-content-secondary line-through decoration-emerald-500/50' 
                              : 'text-content-primary group-hover:text-indigo-600'
                          }`}>
                            {q.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-content-muted">
                          <span className="inline-flex items-center gap-1 font-semibold text-content-secondary">
                            <span>{q.sectionIcon}</span>
                            <span>{q.sectionTitle}</span>
                          </span>
                          {q.companies.slice(0, 3).map((comp) => (
                            <span 
                              key={comp} 
                              className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle text-content-muted border border-border"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        q.difficulty === 'Easy' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {q.difficulty}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalSqlQuestion(q);
                        }}
                        className="btn-pill-purple text-xs px-3.5 py-1.5 flex items-center gap-1 group-hover:shadow !bg-indigo-600 hover:!bg-indigo-700"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 3. APTITUDE STREAM (INDIABIX QUANTITATIVE APTITUDE)           */}
      {/* ============================================================= */}
      {activeStream === 'Aptitude' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 rounded-2xl p-6 border border-amber-500/20">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-amber-600 text-white px-2.5 py-0.5 rounded-full">
                    Official IndiaBIX Aptitude
                  </span>
                  <a 
                    href="https://www.indiabix.com/aptitude/questions-and-answers/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline font-semibold"
                  >
                    <span>indiabix.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h2 className="text-xl font-black text-content-primary">
                  IndiaBIX Quantitative Aptitude Master Sheet
                </h2>
                <p className="text-xs sm:text-sm text-content-secondary max-w-2xl leading-relaxed">
                  The complete 50 high-frequency placement questions sequentially arranged across 8 essential topics: Numbers, Profit & Loss, Ratios, Simple/Compound Interest, Time & Work, Speed & Trains, Permutations & Probability, and Clocks/Calendars. Tap any question to view formulas, options, and step-by-step shortcuts.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-w-[280px]">
                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-emerald-600">Easy</p>
                  <p className="text-lg font-black text-content-primary">{aptEasySolved} / {aptEasyTotal}</p>
                  <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${aptEasyTotal ? (aptEasySolved / aptEasyTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-amber-600">Medium</p>
                  <p className="text-lg font-black text-content-primary">{aptMedSolved} / {aptMedTotal}</p>
                  <div className="w-full bg-amber-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${aptMedTotal ? (aptMedSolved / aptMedTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-surface-card p-3 rounded-xl border border-border text-center">
                  <p className="text-xs font-bold text-rose-600">Hard</p>
                  <p className="text-lg font-black text-content-primary">{aptHardSolved} / {aptHardTotal}</p>
                  <div className="w-full bg-rose-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${aptHardTotal ? (aptHardSolved / aptHardTotal) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-content-secondary">Total Aptitude Progress</span>
                <span className="text-amber-600">{totalAptSolvedCount} of {TOTAL_APTITUDE_PROBLEMS} Solved ({aptSolvedPercentage}%)</span>
              </div>
              <div className="w-full bg-surface-card rounded-full h-2.5 overflow-hidden border border-border/50">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${aptSolvedPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Category Selector Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-content-muted">
                Navigate Aptitude Topics (8 Categories)
              </span>
              <span className="text-xs text-content-secondary">
                {selectedAptCategory === 'all' ? 'Showing all categories' : `Category ${selectedAptCategory} selected`}
              </span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedAptCategory('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                  selectedAptCategory === 'all'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-surface-card text-content-secondary hover:text-content-primary border-border'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Topics ({TOTAL_APTITUDE_PROBLEMS})</span>
              </button>

              {INDIABIX_CATEGORIES.map((cat) => {
                const catQuestions = INDIABIX_APTITUDE_QUESTIONS.filter(q => q.categoryId === cat.id);
                const catSolved = catQuestions.filter(q => solvedAptitudeIds.has(q.id)).length;
                const isSelected = selectedAptCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedAptCategory(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-surface-card text-content-secondary hover:text-content-primary border-border hover:border-amber-400'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-surface-subtle text-content-muted'
                    }`}>
                      {catSolved}/{catQuestions.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-surface-card rounded-xl p-4 border border-border flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-content-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={aptSearchQuery}
                onChange={(e) => setAptSearchQuery(e.target.value)}
                placeholder="Search question keyword (e.g. Train, Speed, Profit, Probability, TCS NQT)..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-subtle border border-border text-xs sm:text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:border-amber-500"
              />
              {aptSearchQuery && (
                <button
                  onClick={() => setAptSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary text-xs"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedAptDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    selectedAptDifficulty === diff
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
              {(['All', 'Solved', 'Unsolved'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setAptStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    aptStatusFilter === status
                      ? 'bg-surface-card text-content-primary shadow-xs'
                      : 'text-content-muted hover:text-content-secondary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sequential Aptitude List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-bold text-content-secondary">
                Showing <span className="text-content-primary font-black">{filteredAptQuestions.length}</span> aptitude questions sequentially
              </p>
              {(selectedAptCategory !== 'all' || selectedAptDifficulty !== 'All' || aptStatusFilter !== 'All' || aptSearchQuery) && (
                <button
                  onClick={() => {
                    setSelectedAptCategory('all');
                    setSelectedAptDifficulty('All');
                    setAptStatusFilter('All');
                    setAptSearchQuery('');
                  }}
                  className="text-xs text-amber-600 hover:underline font-semibold"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {filteredAptQuestions.length === 0 ? (
              <div className="bg-surface-card rounded-2xl p-12 text-center border border-border">
                <Calculator className="w-12 h-12 text-content-muted mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-bold text-content-primary">No aptitude problems match your filter</h3>
                <p className="text-xs text-content-secondary mt-1">Try resetting the difficulty or search query.</p>
              </div>
            ) : (
              filteredAptQuestions.map((q) => {
                const isSolved = solvedAptitudeIds.has(q.id);

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveModalAptQuestion(q)}
                    className={`group bg-surface-card rounded-xl p-4 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md hover:border-amber-400 ${
                      isSolved 
                        ? 'border-emerald-500/20 bg-emerald-50/10' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => toggleAptitudeSolved(q.id, e)}
                        className="mt-0.5 text-content-muted hover:text-amber-600 transition-colors flex-shrink-0"
                        title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                      >
                        {isSolved ? (
                          <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                        ) : (
                          <Square className="w-5 h-5 text-content-muted group-hover:text-amber-600" />
                        )}
                      </button>

                      <span className="text-xs font-mono font-bold text-content-muted pt-0.5 flex-shrink-0">
                        #{String(q.sheetIndex).padStart(2, '0')}
                      </span>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                            isSolved 
                              ? 'text-content-secondary line-through decoration-emerald-500/50' 
                              : 'text-content-primary group-hover:text-amber-600'
                          }`}>
                            {q.title}
                          </h4>
                        </div>

                        <p className="text-xs text-content-secondary line-clamp-1">
                          {q.question}
                        </p>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-content-muted pt-0.5">
                          <span className="inline-flex items-center gap-1 font-semibold text-content-secondary">
                            <span>{q.categoryIcon}</span>
                            <span>{q.topic}</span>
                          </span>
                          {q.companies.slice(0, 3).map((comp) => (
                            <span 
                              key={comp} 
                              className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded bg-surface-subtle text-content-muted border border-border"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        q.difficulty === 'Easy' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : q.difficulty === 'Medium'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {q.difficulty}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalAptQuestion(q);
                        }}
                        className="btn-pill-purple text-xs px-3.5 py-1.5 flex items-center gap-1 group-hover:shadow !bg-amber-600 hover:!bg-amber-700"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 4. WEB DEV FALLBACK                                           */}
      {/* ============================================================= */}
      {activeStream === 'Web Dev' && (
        <div className="space-y-6">
          <div className="bg-surface-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-bold text-content-primary mb-1">Web Development Interview Preparation</h3>
            <p className="text-xs text-content-secondary mb-4">
              Comprehensive full-stack engineering track curated for Situ Chandra / JNU placement track.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {webDevTopics.map((topic) => (
                <div key={topic.name} className="p-4 rounded-xl bg-surface-subtle border border-border space-y-2">
                  <span className="text-2xl">{topic.icon}</span>
                  <h4 className="text-sm font-bold text-content-primary">{topic.name}</h4>
                  <p className="text-xs text-content-muted">{topic.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* DEDICATED DSA QUESTION DETAILS MODAL                          */}
      {/* ============================================================= */}
      {activeModalDsaQuestion && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalDsaQuestion(null)}
        >
          <div 
            className="bg-surface-card rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-border bg-surface-subtle/50 flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded">
                    Sheet #{String(activeModalDsaQuestion.sheetIndex).padStart(2, '0')}
                  </span>
                  <span className="text-content-secondary font-semibold">
                    {activeModalDsaQuestion.stepTitle}
                  </span>
                  <span>&bull;</span>
                  <span className="text-content-muted">
                    {activeModalDsaQuestion.topic}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-content-primary leading-tight">
                  {activeModalDsaQuestion.title}
                </h3>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    activeModalDsaQuestion.difficulty === 'Easy' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : activeModalDsaQuestion.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {activeModalDsaQuestion.difficulty}
                  </span>

                  <span className="text-xs font-mono bg-surface-card px-2.5 py-0.5 rounded border border-border text-content-secondary">
                    Time: {activeModalDsaQuestion.timeComplexity}
                  </span>

                  <span className="text-xs font-mono bg-surface-card px-2.5 py-0.5 rounded border border-border text-content-secondary">
                    Space: {activeModalDsaQuestion.spaceComplexity}
                  </span>

                  <button
                    onClick={() => toggleDsaSolved(activeModalDsaQuestion.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border transition-all ${
                      solvedDsaIds.has(activeModalDsaQuestion.id)
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : 'bg-surface-card text-content-secondary border-border hover:border-brand-purple'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{solvedDsaIds.has(activeModalDsaQuestion.id) ? 'Solved ✓' : 'Mark as Solved'}</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setActiveModalDsaQuestion(null)}
                className="text-content-muted hover:text-content-primary p-2 rounded-lg hover:bg-surface-subtle transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-content-primary">
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-purple" />
                  <span>Problem Statement</span>
                </h4>
                <div className="bg-surface-subtle p-4 rounded-xl border border-border text-sm leading-relaxed text-content-primary">
                  {activeModalDsaQuestion.description}
                </div>
              </div>

              {activeModalDsaQuestion.examples && activeModalDsaQuestion.examples.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Examples
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalDsaQuestion.examples.map((ex, idx) => (
                      <div key={idx} className="bg-surface-subtle p-3.5 rounded-xl border border-border font-mono text-xs space-y-1.5">
                        <p><strong className="text-brand-purple font-sans font-bold">Input:</strong> <span className="text-content-primary">{ex.input}</span></p>
                        <p><strong className="text-emerald-600 font-sans font-bold">Output:</strong> <span className="text-content-primary">{ex.output}</span></p>
                        {ex.explanation && (
                          <p className="text-content-secondary font-sans text-xs pt-1 border-t border-border/50">
                            <strong>Explanation:</strong> {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalDsaQuestion.constraints && activeModalDsaQuestion.constraints.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Constraints
                  </h4>
                  <ul className="list-disc list-inside bg-surface-subtle p-3 rounded-xl border border-border text-xs text-content-secondary space-y-1 font-mono">
                    {activeModalDsaQuestion.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Optimal Intuition & Approach</span>
                </h4>
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-xs sm:text-sm text-content-primary leading-relaxed">
                  {activeModalDsaQuestion.optimalApproach}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-brand-purple" />
                    <span>Complete Solution</span>
                  </h4>

                  <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
                    {(['python', 'cpp', 'java'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setActiveDsaLanguage(lang);
                          setCopiedDsaCode(false);
                        }}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md uppercase transition-all ${
                          activeDsaLanguage === lang
                            ? 'bg-brand-purple text-white shadow-xs'
                            : 'text-content-muted hover:text-content-secondary'
                        }`}
                      >
                        {lang === 'cpp' ? 'C++' : lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-border bg-[#1e1e2e] text-[#cdd6f4]">
                  <div className="flex justify-between items-center px-4 py-2 bg-[#181825] border-b border-[#313244] text-[11px] text-[#a6adc8]">
                    <span className="font-mono uppercase font-bold text-brand-purple">
                      {activeDsaLanguage === 'cpp' ? 'C++ (STL)' : activeDsaLanguage === 'java' ? 'Java 17' : 'Python 3'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(activeModalDsaQuestion.solutions[activeDsaLanguage], false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#313244] hover:bg-[#45475a] text-white transition-colors"
                      title="Copy code to clipboard"
                    >
                      {copiedDsaCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                    <code>{activeModalDsaQuestion.solutions[activeDsaLanguage]}</code>
                  </pre>
                </div>
              </div>

              {activeModalDsaQuestion.companies && activeModalDsaQuestion.companies.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Frequently Asked At
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalDsaQuestion.companies.map((company) => (
                      <span
                        key={company}
                        className="px-2.5 py-1 rounded-full bg-surface-subtle text-xs font-semibold text-content-secondary border border-border"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-3">
                {activeModalDsaQuestion.practiceUrl && (
                  <a
                    href={activeModalDsaQuestion.practiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-subtle hover:bg-surface-card border border-border text-xs font-bold text-content-primary hover:border-brand-purple transition-all"
                  >
                    <span>Practice on LeetCode / Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 text-content-muted" />
                  </a>
                )}
                {activeModalDsaQuestion.articleUrl && (
                  <a
                    href={activeModalDsaQuestion.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-subtle hover:bg-surface-card border border-border text-xs font-bold text-brand-purple hover:underline transition-all"
                  >
                    <span>takeUforward Article & Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-subtle/50 flex items-center justify-between gap-3">
              <button
                onClick={() => navigateDsaQuestion('prev')}
                disabled={STRIVERS_A2Z_QUESTIONS.findIndex(q => q.id === activeModalDsaQuestion.id) === 0}
                className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Question</span>
              </button>

              <div className="text-xs text-content-muted font-medium hidden sm:block">
                Question {activeModalDsaQuestion.sheetIndex} of {TOTAL_STRIVERS_PROBLEMS}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleDsaSolved(activeModalDsaQuestion.id)}
                  className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                    solvedDsaIds.has(activeModalDsaQuestion.id)
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-brand-purple text-white hover:opacity-90'
                  }`}
                >
                  {solvedDsaIds.has(activeModalDsaQuestion.id) ? 'Completed ✓' : 'Mark as Done'}
                </button>

                <button
                  onClick={() => navigateDsaQuestion('next')}
                  disabled={STRIVERS_A2Z_QUESTIONS.findIndex(q => q.id === activeModalDsaQuestion.id) === STRIVERS_A2Z_QUESTIONS.length - 1}
                  className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* DEDICATED SQL QUESTION DETAILS MODAL                          */}
      {/* ============================================================= */}
      {activeModalSqlQuestion && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalSqlQuestion(null)}
        >
          <div 
            className="bg-surface-card rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-border bg-surface-subtle/50 flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Sheet #{String(activeModalSqlQuestion.sheetIndex).padStart(2, '0')}
                  </span>
                  <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    LeetCode #{activeModalSqlQuestion.leetcodeId}
                  </span>
                  <span className="text-content-secondary font-semibold">
                    {activeModalSqlQuestion.sectionIcon} {activeModalSqlQuestion.sectionTitle}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-content-primary leading-tight">
                  {activeModalSqlQuestion.title}
                </h3>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    activeModalSqlQuestion.difficulty === 'Easy' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : activeModalSqlQuestion.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {activeModalSqlQuestion.difficulty}
                  </span>

                  <span className="text-xs font-mono bg-surface-card px-2.5 py-0.5 rounded border border-border text-content-secondary">
                    Standard ANSI SQL
                  </span>

                  <button
                    onClick={() => toggleSqlSolved(activeModalSqlQuestion.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border transition-all ${
                      solvedSqlIds.has(activeModalSqlQuestion.id)
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : 'bg-surface-card text-content-secondary border-border hover:border-indigo-500'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{solvedSqlIds.has(activeModalSqlQuestion.id) ? 'Solved ✓' : 'Mark as Solved'}</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setActiveModalSqlQuestion(null)}
                className="text-content-muted hover:text-content-primary p-2 rounded-lg hover:bg-surface-subtle transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-content-primary">
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Problem Statement</span>
                </h4>
                <div className="bg-surface-subtle p-4 rounded-xl border border-border text-sm leading-relaxed text-content-primary">
                  {activeModalSqlQuestion.description}
                </div>
              </div>

              {activeModalSqlQuestion.schema && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-indigo-600" />
                    <span>Table Schemas & Structure</span>
                  </h4>
                  <div className="bg-surface-subtle p-3.5 rounded-xl border border-border font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed text-content-secondary">
                    {activeModalSqlQuestion.schema}
                  </div>
                </div>
              )}

              {activeModalSqlQuestion.examples && activeModalSqlQuestion.examples.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Example Tables & Result
                  </h4>
                  <div className="space-y-3">
                    {activeModalSqlQuestion.examples.map((ex, idx) => (
                      <div key={idx} className="bg-surface-subtle p-3.5 rounded-xl border border-border space-y-2">
                        <div>
                          <p className="text-xs font-bold text-indigo-600 mb-1">Input Table:</p>
                          <pre className="font-mono text-xs overflow-x-auto bg-surface-card p-2.5 rounded-lg border border-border/60 text-content-primary">
                            {ex.input}
                          </pre>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-600 mb-1">Output Table:</p>
                          <pre className="font-mono text-xs overflow-x-auto bg-surface-card p-2.5 rounded-lg border border-border/60 text-content-primary">
                            {ex.output}
                          </pre>
                        </div>
                        {ex.explanation && (
                          <p className="text-xs text-content-secondary pt-1 border-t border-border/50">
                            <strong>Explanation:</strong> {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Optimal SQL Query Logic</span>
                </h4>
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-xs sm:text-sm text-content-primary leading-relaxed">
                  {activeModalSqlQuestion.optimalApproach}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <span>Complete SQL Solution</span>
                  </h4>

                  <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-lg border border-border">
                    <button
                      onClick={() => {
                        setActiveSqlDialect('mysql');
                        setCopiedSqlCode(false);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        activeSqlDialect === 'mysql'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-content-muted hover:text-content-secondary'
                      }`}
                    >
                      MySQL
                    </button>
                    <button
                      onClick={() => {
                        setActiveSqlDialect('postgresql');
                        setCopiedSqlCode(false);
                      }}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        activeSqlDialect === 'postgresql'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-content-muted hover:text-content-secondary'
                      }`}
                    >
                      PostgreSQL
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-border bg-[#1e1e2e] text-[#cdd6f4]">
                  <div className="flex justify-between items-center px-4 py-2 bg-[#181825] border-b border-[#313244] text-[11px] text-[#a6adc8]">
                    <span className="font-mono uppercase font-bold text-indigo-400">
                      {activeSqlDialect === 'mysql' ? 'MySQL 8.0' : 'PostgreSQL 15+'}
                    </span>
                    <button
                      onClick={() => handleCopyCode(activeModalSqlQuestion.solutions[activeSqlDialect], true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#313244] hover:bg-[#45475a] text-white transition-colors"
                      title="Copy SQL query"
                    >
                      {copiedSqlCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                    <code>{activeModalSqlQuestion.solutions[activeSqlDialect]}</code>
                  </pre>
                </div>
              </div>

              {activeModalSqlQuestion.companies && activeModalSqlQuestion.companies.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Frequently Asked At
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalSqlQuestion.companies.map((company) => (
                      <span
                        key={company}
                        className="px-2.5 py-1 rounded-full bg-surface-subtle text-xs font-semibold text-content-secondary border border-border"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={activeModalSqlQuestion.practiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>Solve on LeetCode (Problem #{activeModalSqlQuestion.leetcodeId})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={activeModalSqlQuestion.studyPlanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-subtle hover:bg-surface-card border border-border text-xs font-bold text-indigo-600 hover:underline transition-all"
                >
                  <span>LeetCode Top SQL 50 Study Plan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-subtle/50 flex items-center justify-between gap-3">
              <button
                onClick={() => navigateSqlQuestion('prev')}
                disabled={TOP_SQL_50_QUESTIONS.findIndex(q => q.id === activeModalSqlQuestion.id) === 0}
                className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Question</span>
              </button>

              <div className="text-xs text-content-muted font-medium hidden sm:block">
                Question {activeModalSqlQuestion.sheetIndex} of {TOTAL_SQL_50_PROBLEMS}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSqlSolved(activeModalSqlQuestion.id)}
                  className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                    solvedSqlIds.has(activeModalSqlQuestion.id)
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-indigo-600 text-white hover:opacity-90'
                  }`}
                >
                  {solvedSqlIds.has(activeModalSqlQuestion.id) ? 'Completed ✓' : 'Mark as Done'}
                </button>

                <button
                  onClick={() => navigateSqlQuestion('next')}
                  disabled={TOP_SQL_50_QUESTIONS.findIndex(q => q.id === activeModalSqlQuestion.id) === TOP_SQL_50_QUESTIONS.length - 1}
                  className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* DEDICATED APTITUDE QUESTION DETAILS MODAL ("all details only")*/}
      {/* ============================================================= */}
      {activeModalAptQuestion && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalAptQuestion(null)}
        >
          <div 
            className="bg-surface-card rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-border bg-surface-subtle/50 flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Question #{String(activeModalAptQuestion.sheetIndex).padStart(2, '0')}
                  </span>
                  <span className="text-content-secondary font-semibold">
                    {activeModalAptQuestion.categoryIcon} {activeModalAptQuestion.category}
                  </span>
                  <span>&bull;</span>
                  <span className="text-content-muted">
                    {activeModalAptQuestion.topic}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-content-primary leading-tight">
                  {activeModalAptQuestion.title}
                </h3>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    activeModalAptQuestion.difficulty === 'Easy' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : activeModalAptQuestion.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {activeModalAptQuestion.difficulty}
                  </span>

                  <span className="text-xs font-medium bg-surface-card px-2.5 py-0.5 rounded border border-border text-content-secondary">
                    IndiaBIX Quantitative Aptitude
                  </span>

                  <button
                    onClick={() => toggleAptitudeSolved(activeModalAptQuestion.id)}
                    className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border transition-all ${
                      solvedAptitudeIds.has(activeModalAptQuestion.id)
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                        : 'bg-surface-card text-content-secondary border-border hover:border-amber-500'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{solvedAptitudeIds.has(activeModalAptQuestion.id) ? 'Solved ✓' : 'Mark as Solved'}</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setActiveModalAptQuestion(null)}
                className="text-content-muted hover:text-content-primary p-2 rounded-lg hover:bg-surface-subtle transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - All Details About Aptitude Question Only */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-content-primary">
              
              {/* Question Statement */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Question</span>
                </h4>
                <div className="bg-surface-subtle p-4 sm:p-5 rounded-xl border border-border text-sm sm:text-base font-medium leading-relaxed text-content-primary">
                  {activeModalAptQuestion.question}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                  Options
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalAptQuestion.options.map((opt) => {
                    const isCorrect = opt.label === activeModalAptQuestion.correctOption;
                    return (
                      <div
                        key={opt.label}
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                          isCorrect
                            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-xs'
                            : 'bg-surface-subtle border-border'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isCorrect
                              ? 'bg-emerald-500 text-white'
                              : 'bg-surface-card text-content-secondary border border-border'
                          }`}>
                            {opt.label}
                          </span>
                          <span className={`text-sm font-semibold ${
                            isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-content-primary'
                          }`}>
                            {opt.text}
                          </span>
                        </div>
                        {isCorrect && (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Correct Answer
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Detailed Solution */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-content-muted flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Step-by-Step Detailed Solution</span>
                </h4>
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl text-xs sm:text-sm text-content-primary leading-relaxed whitespace-pre-line font-mono">
                  {activeModalAptQuestion.explanation}
                </div>
              </div>

              {/* Formulas & Shortcut Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Important Formulas */}
                <div className="space-y-1.5 bg-blue-500/5 border border-blue-500/20 p-4 rounded-xl">
                  <h5 className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Important Formula Used</span>
                  </h5>
                  <p className="text-xs font-mono text-content-primary">
                    {activeModalAptQuestion.formula}
                  </p>
                </div>

                {/* Speed Shortcut */}
                <div className="space-y-1.5 bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl">
                  <h5 className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Quick Placement Shortcut</span>
                  </h5>
                  <p className="text-xs text-content-primary font-mono">
                    {activeModalAptQuestion.shortcut}
                  </p>
                </div>
              </div>

              {/* Target Exams & Placement Drives */}
              {activeModalAptQuestion.companies && activeModalAptQuestion.companies.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-content-muted">
                    Frequently Asked in Campus Placements & Exams
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalAptQuestion.companies.map((company) => (
                      <span
                        key={company}
                        className="px-2.5 py-1 rounded-full bg-surface-subtle text-xs font-semibold text-content-secondary border border-border"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* IndiaBIX Source Link */}
              <div className="pt-2">
                <a
                  href={activeModalAptQuestion.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <span>Practice on IndiaBIX</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-surface-subtle/50 flex items-center justify-between gap-3">
              <button
                onClick={() => navigateAptitudeQuestion('prev')}
                disabled={INDIABIX_APTITUDE_QUESTIONS.findIndex(q => q.id === activeModalAptQuestion.id) === 0}
                className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Question</span>
              </button>

              <div className="text-xs text-content-muted font-medium hidden sm:block">
                Question {activeModalAptQuestion.sheetIndex} of {TOTAL_APTITUDE_PROBLEMS}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAptitudeSolved(activeModalAptQuestion.id)}
                  className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${
                    solvedAptitudeIds.has(activeModalAptQuestion.id)
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-amber-600 text-white hover:opacity-90'
                  }`}
                >
                  {solvedAptitudeIds.has(activeModalAptQuestion.id) ? 'Completed ✓' : 'Mark as Done'}
                </button>

                <button
                  onClick={() => navigateAptitudeQuestion('next')}
                  disabled={INDIABIX_APTITUDE_QUESTIONS.findIndex(q => q.id === activeModalAptQuestion.id) === INDIABIX_APTITUDE_QUESTIONS.length - 1}
                  className="btn-pill-outline text-xs px-3.5 py-2 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
