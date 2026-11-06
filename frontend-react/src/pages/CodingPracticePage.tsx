import React, { useState } from 'react';

export const CodingPracticePage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<string | null>('two-sum');

  const problems = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      tags: ['Array', 'Hash Map'],
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
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      tags: ['Stack'],
      diff: 'Easy',
      desc: 'Given a string s containing just characters (), {}, [], determine if the input string is valid.',
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
      id: 'merge-intervals',
      title: 'Merge Intervals',
      tags: ['Array', 'Sorting'],
      diff: 'Medium',
      desc: 'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.',
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

  const activeProblemObj = problems.find(p => p.id === selectedProblem) || problems[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#120E2C]">Coding Practice</h1>
        <p className="text-gray-500 text-sm mt-1">Improve your problem-solving skills with real interview questions.</p>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-emerald-600">Easy</p>
          <p className="text-xl font-black text-[#120E2C]">420 Problems</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-amber-600">Medium</p>
          <p className="text-xl font-black text-[#120E2C]">680 Problems</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-red-600">Hard</p>
          <p className="text-xl font-black text-[#120E2C]">280 Problems</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-[#5B3CE8]">All Questions</p>
          <p className="text-xl font-black text-[#120E2C]">1,380 Problems</p>
        </div>
      </div>

      {/* Problem Solver Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Recommended Problems</h2>
          <div className="divide-y divide-gray-100">
            {problems.map((prob) => (
              <div 
                key={prob.id}
                onClick={() => setSelectedProblem(prob.id)}
                className={`py-3.5 px-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                  selectedProblem === prob.id ? 'bg-[#EDE9FE]' : 'hover:bg-gray-50'
                }`}
              >
                <div>
                  <h3 className="font-bold text-sm text-[#120E2C]">{prob.title}</h3>
                  <div className="flex gap-1.5 mt-1">
                    {prob.tags.map(t => (
                      <span key={t} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/80 text-gray-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  prob.diff === 'Easy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {prob.diff}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Problem Preview */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                {activeProblemObj.diff} &bull; Optimal O(N)
              </span>
              <h2 className="text-2xl font-black text-[#120E2C] mt-2">{activeProblemObj.title}</h2>
            </div>
            <button 
              onClick={() => alert('Test Cases Passed! 100% Correct.')}
              className="btn-pill-purple text-xs px-4 py-2"
            >
              Run Test Cases ▶
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {activeProblemObj.desc}
          </p>

          <div className="bg-[#120E2C] text-gray-100 rounded-2xl p-5 font-mono text-xs overflow-x-auto shadow-inner">
            <p className="text-gray-400 mb-2 font-sans font-semibold text-[11px]"># Python Optimal Hash Map Solution</p>
            <pre><code>{activeProblemObj.solution}</code></pre>
          </div>
        </div>

      </div>

    </div>
  );
};
