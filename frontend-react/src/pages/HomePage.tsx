import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Terminal, Sparkles, CheckCircle2, Trophy } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 py-8 md:py-12">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light text-brand-primary text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Placement Preparation Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-content-primary tracking-tight leading-[1.15]">
              Build Skills,<br />
              Build Projects,<br />
              <span className="text-brand-primary">Get Placed.</span>
            </h1>

            <p className="text-lg text-content-secondary max-w-xl leading-relaxed">
              A structured, practical, and personalized platform to make you job-ready for top engineering and tech roles.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/register" className="btn-pill-purple gap-2 text-base px-7 py-3">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/career-paths" className="btn-pill-outline text-base px-6 py-3">
                Explore Career Paths
              </Link>
            </div>

            {/* 5-Benefit Icon Strip (Screen 1 Mockup) */}
            <div className="pt-8 border-t border-surface-border/80 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { title: 'Structured Learning', icon: '📚' },
                { title: 'Coding Practice', icon: '💻' },
                { title: 'Real Projects', icon: '🛠️' },
                { title: 'Interview Prep', icon: '👥' },
                { title: 'Placement Guidance', icon: '🚀' },
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-card p-3 rounded-xl border border-surface-border shadow-sm flex flex-col items-center text-center">
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs font-bold text-content-primary leading-tight">{item.title}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="w-full aspect-[4/3] bg-gradient-to-tr from-brand-light to-white rounded-3xl p-6 shadow-xl border border-surface-border flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}home-hero-student.svg`}
                  alt="Student preparing for placement"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Career Paths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-content-primary">Choose Your Learning Direction</h2>
          <p className="text-content-secondary mt-2">Follow structured roadmaps tailored for high-demand campus placement roles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Software Developer',
              desc: 'Build full-stack applications, master DSA, and prepare for high-impact developer roles.',
              tags: ['DSA', 'Web Dev', 'Projects'],
              link: '/career-paths#software-dev',
              color: 'border-l-4 border-brand-primary',
            },
            {
              title: 'Data Analyst',
              desc: 'Transform raw data into insights with SQL, Python analytics libraries, and Power BI dashboards.',
              tags: ['Python', 'SQL', 'Power BI'],
              link: '/career-paths#data-analyst',
              color: 'border-l-4 border-emerald-500',
            },
            {
              title: 'Data Scientist',
              desc: 'Learn applied machine learning, build production ML models, and solve real data problems.',
              tags: ['Python', 'ML', 'Projects'],
              link: '/career-paths#data-scientist',
              color: 'border-l-4 border-blue-500',
            },
          ].map((role, idx) => (
            <div key={idx} className={`bg-surface-card p-6 rounded-2xl border border-surface-border shadow-sm flex flex-col justify-between ${role.color}`}>
              <div>
                <h3 className="font-bold text-xl text-content-primary mb-2">{role.title}</h3>
                <p className="text-sm text-content-secondary mb-4">{role.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {role.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-content-primary rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Link to={role.link} className="btn-pill-outline text-sm text-center py-2">
                Choose Path &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-ink text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Accelerate Your Tech Career?</h3>
            <p className="text-gray-300 max-w-xl text-sm sm:text-base">
              Join ExamMate AI today and gain the algorithmic skills, portfolio projects, and interview confidence to land your dream offer.
            </p>
          </div>
          <Link to="/register" className="btn-pill-purple bg-brand-primary text-white whitespace-nowrap px-8 py-3.5 text-base">
            Get Started for Free &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
};
