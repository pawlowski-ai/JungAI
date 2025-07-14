
import React, { useState, useCallback, useEffect } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { AnalysisResultScreen } from './screens/AnalysisResultScreen';
import { BlockedModal } from './components/BlockedModal';
import { analyzeDreamWithGemini } from './services/geminiService';
import { IMMEDIATE_BLOCK_TRIGGER_PHRASE, REFUSAL_TRIGGER_PHRASE } from './constants';

export type ScreenName = 'welcome' | 'loading' | 'analysis';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [dream, setDream] = useState<string>('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // For API call, not screen loading state
  const [error, setError] = useState<string | null>(null);
  const [offenseCount, setOffenseCount] = useState<number>(0);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const [screenState, setScreenState] = useState<{ current: ScreenName, previous?: ScreenName }>({ current: 'welcome' });

  useEffect(() => {
    // This effect handles the CSS classes for screen transitions
    const newScreenElement = document.getElementById(screenState.current);
    const oldScreenElement = screenState.previous ? document.getElementById(screenState.previous) : null;

    if (oldScreenElement) {
      oldScreenElement.classList.remove('active');
      oldScreenElement.classList.add('hidden');
    }
    if (newScreenElement) {
      newScreenElement.classList.remove('hidden');
      newScreenElement.classList.add('entering');
      requestAnimationFrame(() => {
        newScreenElement.classList.remove('entering');
        newScreenElement.classList.add('active');
      });
    }
  }, [screenState]);

  const navigateTo = (screen: ScreenName) => {
    setScreenState(prev => ({ current: screen, previous: prev.current }));
  };


  const handleAnalyzeDream = useCallback(async () => {
    if (!dream.trim()) {
      setError("Proszę wpisać treść snu.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    navigateTo('loading');

    try {
      // The isRetryAfterRefusal flag is less critical for prompt selection now,
      // but can be kept for other potential client-side logic or logging.
      const result = await analyzeDreamWithGemini(dream, offenseCount > 0);
      
      if (result.includes(IMMEDIATE_BLOCK_TRIGGER_PHRASE)) {
        setIsBlocked(true);
        // No need to setError here for WelcomeScreen, BlockedModal takes precedence.
        // The modal itself informs the user about the block.
      } else if (result.includes(REFUSAL_TRIGGER_PHRASE)) {
        setOffenseCount(prev => prev + 1);
        if (offenseCount + 1 >= 2) {
          setIsBlocked(true);
          // Optional: set a generic error that might be logged, but BlockedModal is key.
          // setError("Zostałeś zablokowany za wielokrotne próby obejścia regulaminu.");
        } else {
          setError(result); // Show AI's polite refusal message on WelcomeScreen
          navigateTo('welcome');
        }
      } else {
        setAnalysis(result);
        setOffenseCount(0); // Reset on successful analysis
        navigateTo('analysis');
      }
    } catch (err) {
      console.error("Error analyzing dream:", err);
      const errorMessage = err instanceof Error ? `Błąd analizy: ${err.message}.` : "Wystąpił nieznany błąd.";
      setError(`${errorMessage} Upewnij się, że klucz API jest poprawnie skonfigurowany lub twoje zapytanie jest zgodne z regulaminem.`);
      navigateTo('welcome');
    } finally {
      setIsLoading(false); 
    }
  }, [dream, offenseCount]);

  const handleAnalyzeAnotherDream = () => {
    setDream('');
    setAnalysis(null);
    setError(null);
    // offenseCount and isBlocked state persist as per requirements
    navigateTo('welcome');
  };

  const handleCloseBlockedModal = () => {
    // Currently, closing the modal does not unblock the user.
    // The `isBlocked` state remains true.
  };


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-amber-500 selection:text-slate-900 relative">
      <WelcomeScreen
        id="welcome"
        dream={dream}
        onDreamChange={setDream}
        onAnalyze={handleAnalyzeDream}
        isLoading={isLoading} 
        error={error}
        isActive={screenState.current === 'welcome'}
        isBlocked={isBlocked} // Pass isBlocked to disable input if needed
      />
      <LoadingScreen
        id="loading"
        isActive={screenState.current === 'loading'}
      />
      <AnalysisResultScreen
        id="analysis"
        analysis={analysis}
        onAnalyzeAnother={handleAnalyzeAnotherDream}
        isActive={screenState.current === 'analysis'}
      />
      
      {isBlocked && <BlockedModal onClose={handleCloseBlockedModal} />}

      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 bg-slate-900/80 backdrop-blur-sm text-slate-500 text-xs sm:text-sm z-50">
        <p>&copy; {new Date().getFullYear()} Jungian Dream Analyzer AI. Stworzone z pasją do głębi przez <a href="https://www.linkedin.com/in/pawlowski-lukasz" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-500 underline">Łukasza Pawłowskiego</a>.</p>
        <p className="mt-1">Pamiętaj, że ta analiza jest generowana przez AI i powinna być traktowana jako inspiracja, a nie profesjonalna porada psychologiczna.</p>
      </footer>
    </div>
  );
};

export default App;
