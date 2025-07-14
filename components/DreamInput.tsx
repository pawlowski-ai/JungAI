
import React from 'react';

interface DreamInputProps {
  dream: string;
  onDreamChange: (dream: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  isDisabled?: boolean; // New prop to explicitly disable the component
}

export const DreamInput: React.FC<DreamInputProps> = ({ dream, onDreamChange, onAnalyze, isLoading, isDisabled }) => {
  const trulyDisabled = isLoading || isDisabled;

  return (
    <div className="space-y-6">
      <textarea
        value={dream}
        onChange={(e) => onDreamChange(e.target.value)}
        placeholder={isDisabled ? "Dostęp zablokowany." : "Opisz swój sen tak szczegółowo, jak pamiętasz..."}
        rows={10}
        className="w-full p-4 bg-slate-700/80 text-slate-50 border border-slate-600 rounded-lg shadow-inner focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors duration-200 placeholder-slate-400 resize-none"
        disabled={trulyDisabled}
        aria-label="Pole tekstowe do opisu snu"
        aria-disabled={trulyDisabled}
      />
      <button
        onClick={onAnalyze}
        disabled={trulyDisabled || !dream.trim()}
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        aria-live="polite"
        aria-disabled={trulyDisabled}
      >
        {isLoading ? 'Analizuję...' : (isDisabled ? 'Zablokowano' : 'Analizuj Sen')}
      </button>
    </div>
  );
};
