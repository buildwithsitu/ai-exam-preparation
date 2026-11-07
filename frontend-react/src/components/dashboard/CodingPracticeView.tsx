import React, { useState } from 'react';
import { Code2, CheckCircle2, TrendingUp, Flame } from 'lucide-react';

export const CodingPracticeView: React.FC = () => {
  const [activeStream, setActiveStream] = useState('DSA');
  const [activeTopic, setActiveTopic] = useState('Arrays');
  const [activeModalProblem, setActiveModalProblem] = useState<any | null>(null);

  const streams = ['DSA', 'Web Dev', 'SQL', 'Aptitude'];

  const topics = [
    { name: 'Arrays', count: '80 Q', icon: '📦' },
    { name: 'Strings', count: '65 Q', icon: '🔤' },
    { name: 'Sorting', count: '40 Q', icon: '📶' },
    { name: 'Searching', count: '45 Q', icon: '🔍' },
    { name: 'Hashing', count: '36 Q', icon: '🔑' },
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      topic: 'Arrays',
      diff: 'Easy',
      desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      solution: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      topic: 'Strings',
      diff: 'Easy',
      desc: 'Given a string containing just the characters (), {}, [], determine if the input string is valid.',
      solution: `def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0`,
    },
    {
      id: 3,
      title: 'Merge Intervals',
      topic: 'Sorting',
      diff: 'Medium',
      desc: 'Merge all overlapping intervals and return an array of the non-overlapping intervals.',
      solution: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
    return merged`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-content-primary">Coding Practice</h2>
        <p className="text-sm text-content-secondary mt-1">Solve problems, improve logic, and get interview-ready.</p>
      </div>

      {/* Stream Selector */}
      <div className="flex gap-2">
        {streams.map(st => (
          <button
            key={st}
            onClick={() => setActiveStream(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeStream === st
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-surface-card text-content-primary hover:bg-gray-100 border border-surface-border'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* 4 Stat Metrics (Mockup 2 Screen 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-primary flex items-center justify-center font-bold text-sm">
            &lt;/&gt;
          </div>
          <div>
            <p className="text-xl font-black text-content-primary">420</p>
            <p className="text-xs text-content-secondary">Problems</p>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <p className="text-xl font-black text-content-primary">180</p>
            <p className="text-xs text-content-secondary">Solved</p>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            📈
          </div>
          <div>
            <p className="text-xl font-black text-content-primary">58%</p>
            <p className="text-xs text-content-secondary">Accuracy</p>
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-2xl border border-surface-border shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            🔥
          </div>
          <div>
            <p className="text-xl font-black text-content-primary">12</p>
            <p className="text-xs text-content-secondary">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Practice by Topic (5 Horizontal Cards) */}
      <div>
        <h3 className="font-bold text-sm text-content-primary uppercase tracking-wider mb-3">Practice by Topic</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {topics.map(t => (
            <div
              key={t.name}
              onClick={() => setActiveTopic(t.name)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                activeTopic === t.name
                  ? 'border-brand-primary bg-brand-light/40 text-brand-primary shadow-sm'
                  : 'bg-surface-card border-surface-border hover:bg-surface-subtle text-content-primary'
              }`}
            >
              <span className="text-xl mb-1">{t.icon}</span>
              <p className="font-bold text-xs">{t.name}</p>
              <p className="text-[11px] text-content-secondary">{t.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Rows */}
      <div className="bg-surface-card p-6 rounded-2xl border border-surface-border shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-content-primary">Recommended Problem Drills</h3>
        <div className="divide-y divide-gray-100">
          {problems.map((prob) => (
            <div key={prob.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400">0{prob.id}</span>
                <strong className="text-sm text-content-primary">{prob.title}</strong>
                <span className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-content-secondary font-medium">
                  {prob.topic}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  prob.diff === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {prob.diff}
                </span>
                <button
                  onClick={() => setActiveModalProblem(prob)}
                  className="btn-pill-purple text-xs px-4 py-1.5"
                >
                  Solve &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Solver Modal */}
      {activeModalProblem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface-card rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {activeModalProblem.diff} &bull; Optimal O(N)
                </span>
                <h3 className="text-xl font-black text-content-primary mt-1.5">{activeModalProblem.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModalProblem(null)}
                className="text-gray-400 hover:text-content-secondary text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <p className="text-xs text-content-secondary leading-relaxed">
              {activeModalProblem.desc}
            </p>

            <div className="bg-brand-ink text-gray-100 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <pre><code>{activeModalProblem.solution}</code></pre>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setActiveModalProblem(null)}
                className="btn-pill-outline text-xs px-4 py-2"
              >
                Close
              </button>
              <button 
                onClick={() => alert('All test cases passed successfully!')}
                className="btn-pill-purple text-xs px-5 py-2"
              >
                Submit Code ▶
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
