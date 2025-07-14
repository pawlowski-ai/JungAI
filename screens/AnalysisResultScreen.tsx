

import React, { useCallback, useState } from 'react';
import { AnalysisDisplay } from '../components/AnalysisDisplay';
import { ShareIcon, ClipboardCopyIcon, ArrowLeftIcon } from '../components/Icons'; // Assuming you'll create an Icons component

interface AnalysisResultScreenProps {
  id: string;
  analysis: string | null;
  onAnalyzeAnother: () => void;
  isActive: boolean;
}

export const AnalysisResultScreen: React.FC<AnalysisResultScreenProps> = ({
  id,
  analysis,
  onAnalyzeAnother,
  isActive,
}) => {
  const [copyStatus, setCopyStatus] = useState<string>('Kopiuj Analizę');
  const [shareStatus, setShareStatus] = useState<string>('Udostępnij');

  const handleCopyToClipboard = useCallback(() => {
    if (analysis) {
      navigator.clipboard.writeText(analysis)
        .then(() => {
          setCopyStatus('Skopiowano!');
          setTimeout(() => setCopyStatus('Kopiuj Analizę'), 2000);
        })
        .catch(err => {
          console.error('Failed to copy analysis: ', err);
          setCopyStatus('Błąd kopiowania');
          setTimeout(() => setCopyStatus('Kopiuj Analizę'), 2000);
        });
    }
  }, [analysis]);

  const handleShare = useCallback(async () => {
    if (!analysis) return;

    const currentHref = window.location.href;
    const shareObject: ShareData = {
      title: 'Moja Analiza Snu z Jungian Dream Analyzer AI',
      text: `Oto analiza mojego snu:\n\n${analysis}\n\nPrzeanalizuj swój sen na: ${currentHref}`,
      // url will be added conditionally
    };

    // Only add the url property if it's a valid http/https URL
    if (currentHref.startsWith('http://') || currentHref.startsWith('https://')) {
      shareObject.url = currentHref;
    }


    if (navigator.share) {
      try {
        await navigator.share(shareObject);
        setShareStatus('Udostępniono!');
        setTimeout(() => setShareStatus('Udostępnij'), 2000);
      } catch (err) {
        console.error('Error sharing:', err);
        // If user cancels share, it might throw an AbortError, which is fine.
        // Check if error is an instance of Error before accessing name property
        if (err instanceof Error && err.name !== 'AbortError') {
          setShareStatus('Błąd udostępniania');
          setTimeout(() => setShareStatus('Udostępnij'), 2000);
        } else if (!(err instanceof Error)) {
          // Handle cases where err might not be an Error object
          setShareStatus('Błąd udostępniania');
          setTimeout(() => setShareStatus('Udostępnij'), 2000);
        }
         else {
           setShareStatus('Udostępnij'); // Reset if cancelled or non-critical error
        }
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      // The text already contains the title and the URL.
      navigator.clipboard.writeText(`${shareObject.title}\n\n${shareObject.text}`)
        .then(() => {
          setShareStatus('Skopiowano link!');
          alert('Link do udostępnienia analizy został skopiowany do schowka.');
          setTimeout(() => setShareStatus('Udostępnij'), 3000);
        })
        .catch(err => {
          console.error('Failed to copy shareable text: ', err);
          setShareStatus('Błąd kopiowania');
           setTimeout(() => setShareStatus('Udostępnij'), 2000);
        });
    }
  }, [analysis]);

  if (!analysis && isActive) {
    // Should not happen if navigation is correct, but a safeguard
    return (
      <div id={id} className={`screen ${isActive ? 'active' : 'hidden'} p-4 sm:p-8 flex flex-col items-center justify-center`}>
        <p className="text-xl text-slate-300">Brak analizy do wyświetlenia. Spróbuj ponownie.</p>
        <button
          onClick={onAnalyzeAnother}
          className="mt-6 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Analizuj inny sen
        </button>
      </div>
    );
  }
  
  if (!analysis) return null; // Don't render if not active or no analysis

  return (
    <div id={id} className={`screen ${isActive ? 'active' : 'hidden'} p-4 sm:p-8 flex flex-col items-center`}>
      <div className="w-full max-w-3xl pb-24"> {/* Added pb-24 here */}
        <main className="mt-2 sm:mt-8">
          <AnalysisDisplay analysis={analysis} />
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={handleCopyToClipboard}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              aria-label="Kopiuj analizę snu do schowka"
            >
              <ClipboardCopyIcon className="w-5 h-5 mr-2" />
              {copyStatus}
            </button>
            <button
              onClick={handleShare}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              aria-label="Udostępnij analizę snu"
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              {shareStatus}
            </button>
            <button
              onClick={onAnalyzeAnother}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              aria-label="Przejdź do analizy innego snu"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Analizuj Inny Sen
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};