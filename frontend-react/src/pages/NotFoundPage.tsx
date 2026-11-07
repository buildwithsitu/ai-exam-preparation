import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
    <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">404</p>
    <h1 className="mt-3 text-3xl font-black text-content-primary">Page not found</h1>
    <p className="mt-2 text-content-secondary">
      The page may have moved, or the address may be incorrect.
    </p>
    <Link to="/" className="btn-pill-purple mt-6">
      Back to home
    </Link>
  </main>
);
