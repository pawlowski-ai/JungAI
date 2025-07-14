
import React from 'react';
import { Header } from '../components/Header';
import { DreamInput } from '../components/DreamInput';
import { ErrorMessage } from '../components/ErrorMessage';
import { JungianSymbolIcon } from '../components/JungianSymbolIcon';

interface WelcomeScreenProps {
  id: string;
  dream: string;
  onDreamChange: (dream: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  error: string | null;
  isActive: boolean;
  isBlocked?: boolean; // Added for disabling input when blocked
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  id,
  dream,
  onDreamChange,
  onAnalyze,
  isLoading,
  error,
  isActive,
  isBlocked,
}) => {
  return (
    <div id={id} className={`screen ${isActive ? 'active' : 'hidden'} p-4 sm:p-8 flex flex-col items-center justify-center`}>
      <div className="psychedelic-bg"></div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="floating-element"></div>
      ))}
      
      <div className="w-full max-w-3xl relative z-10">
        <Header />
        <main className="mt-8 bg-slate-800/70 backdrop-blur-md shadow-2xl rounded-lg p-6 sm:p-10">
          <div className="flex justify-center mb-6">
            <JungianSymbolIcon className="w-16 h-16 text-amber-400 animate-pulse" />
          </div>
          <p className="text-center text-slate-300 mb-8 text-lg">
            Witaj w analizatorze snów. Wpisz swój sen poniżej, aby odkryć jego symbolikę i ukryte znaczenia z perspektywy psychologii głębi C.G. Junga.
          </p>
          <DreamInput
            dream={dream}
            onDreamChange={onDreamChange}
            onAnalyze={onAnalyze}
            isLoading={isLoading || !!isBlocked} // Disable if loading or blocked
            isDisabled={!!isBlocked} // Explicitly pass disabled state
          />
          {error && !isLoading && !isBlocked && <ErrorMessage message={error} />}
        </main>
      </div>
    </div>
  );
};
