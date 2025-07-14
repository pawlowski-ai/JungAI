import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-4 sm:py-6">
      <h1 className="font-heading text-3xl sm:text-5xl font-bold text-amber-400">
        Jungian Dream Analyzer AI
      </h1>
      <p className="mt-2 sm:mt-3 text-slate-300 text-sm sm:text-lg">
        Zrozum swoje sny, odkryj ich przesłanie.
      </p>
    </header>
  );
};