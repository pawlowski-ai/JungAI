import React from 'react';

export const LoadingSpinner: React.FC<{message?: string}> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mb-4"></div>
      <p className="text-slate-300 text-xl font-heading">
        {message || "Trwa analiza, proszę czekać..."}
      </p>
      <p className="text-slate-400 text-sm mt-2">Wsłuchuję się w echa Twojej nieświadomości...</p>
    </div>
  );
};