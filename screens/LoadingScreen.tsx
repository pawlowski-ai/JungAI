import React from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface LoadingScreenProps {
  id: string;
  isActive: boolean;
}

const dreamLoadingMessages = [
  "Zagłębiam się w symbolikę Twojego snu...",
  "Odczytuję mapę Twojej nieświadomości...",
  "Archetypy szepczą odpowiedzi...",
  "Podróżuję przez labirynt Twoich wizji sennych...",
  "Tkając nić interpretacji...",
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ id, isActive }) => {
  const [message, setMessage] = React.useState(dreamLoadingMessages[0]);

  React.useEffect(() => {
    if (isActive) {
      const randomIndex = Math.floor(Math.random() * dreamLoadingMessages.length);
      setMessage(dreamLoadingMessages[randomIndex]);
    }
  }, [isActive]);
  
  return (
    <div 
      id={id} 
      className={`screen ${isActive ? 'active' : 'hidden'} flex flex-col items-center justify-center p-4 bg-slate-900`}
      aria-live="assertive" 
      aria-busy="true"
    >
      <div className="relative">
        {/* Animated background elements for loading screen */}
        <div className="absolute -inset-12 bg-gradient-to-r from-amber-400 to-pink-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div 
          className="absolute -inset-24 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full blur-2xl opacity-10 animate-pulse" 
          style={{ animationDelay: '2s' }}
        ></div>
        
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Central rotating symbol (simplified Jungian icon idea) */}
          <svg 
            className="w-full h-full animate-spin" 
            style={{ animationDuration: '8s' }} 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" stroke="url(#paint0_linear_loading)" strokeWidth="5"/>
            <path d="M50 15 L75 40 L50 65 L25 40 Z" stroke="url(#paint1_linear_loading)" strokeWidth="3"/>
            <circle cx="50" cy="50" r="5" fill="url(#paint2_linear_loading)"/>
            <defs>
              <linearGradient id="paint0_linear_loading" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24"/> 
                <stop offset="1" stopColor="#F59E0B"/>
              </linearGradient>
              <linearGradient id="paint1_linear_loading" x1="25" y1="15" x2="75" y2="65" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FCD34D"/>
                <stop offset="1" stopColor="#FBBF24"/>
              </linearGradient>
               <linearGradient id="paint2_linear_loading" x1="45" y1="45" x2="55" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEF3C7"/>
                <stop offset="1" stopColor="#FDE68A"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <LoadingSpinner message={message}/>
    </div>
  );
};
