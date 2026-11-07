import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, TrendingUp, Target, Award } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-content-primary">Performance &amp; Progress Insights</h1>
        <p className="text-content-secondary text-sm mt-1">Review your accuracy trends, identify weak topics, and track improvement over time.</p>
      </div>

      {/* Weak Area Priority Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Priority Study Alert &bull; Answers: What should I do next?
            </span>
            <h2 className="text-lg font-bold text-content-primary mt-0.5">Focus Needed: Graph Traversal (BFS &amp; DFS)</h2>
            <p className="text-xs text-content-secondary mt-1 max-w-xl">
              Your practice accuracy on Graph Traversal is currently <strong>42%</strong> (target: 75%). Improving this single topic will raise your overall mastery by ~6%.
            </p>
          </div>
        </div>

        <Link to="/practice" className="btn-pill-purple bg-amber-600 hover:bg-amber-700 text-white text-xs px-5 py-2.5 whitespace-nowrap shrink-0">
          Drill Graph Questions &rarr;
        </Link>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm">
          <Target className="w-5 h-5 text-brand-primary mb-2" />
          <p className="text-2xl font-black text-content-primary">76.4%</p>
          <p className="text-xs text-content-secondary">Overall Accuracy (↗ 4.2%)</p>
        </div>
        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm">
          <TrendingUp className="w-5 h-5 text-emerald-600 mb-2" />
          <p className="text-2xl font-black text-content-primary">124</p>
          <p className="text-xs text-content-secondary">Problems Solved</p>
        </div>
        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm">
          <Award className="w-5 h-5 text-amber-600 mb-2" />
          <p className="text-2xl font-black text-content-primary">15 Days</p>
          <p className="text-xs text-content-secondary">Continuous Practice</p>
        </div>
        <div className="bg-surface-card p-5 rounded-2xl border border-surface-border shadow-sm">
          <Target className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-black text-content-primary">5 Mocks</p>
          <p className="text-xs text-content-secondary">Technical Tests Completed</p>
        </div>
      </div>
    </div>
  );
};
