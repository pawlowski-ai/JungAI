import React from 'react';

interface JungianSymbolIconProps {
  className?: string;
}

export const JungianSymbolIcon: React.FC<JungianSymbolIconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      fill="none" 
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      {/* Outer circle - totality, self */}
      <circle cx="50" cy="50" r="45" />
      
      {/* Inner square - earth, material reality, stability */}
      <rect x="25" y="25" width="50" height="50" transform="rotate(0 50 50)" strokeWidth="2.5" />
      
      {/* Triangle pointing up - aspiration, fire, masculine */}
      <path d="M50 15 L75 50 L25 50 Z" strokeWidth="2.5" />
      
      {/* Triangle pointing down - receptivity, water, feminine */}
      <path d="M50 85 L25 50 L75 50 Z" strokeWidth="2.5" />

      {/* Center point - origin, a spark of consciousness */}
      <circle cx="50" cy="50" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
};