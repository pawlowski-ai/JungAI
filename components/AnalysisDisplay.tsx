import React from 'react';

interface AnalysisDisplayProps {
  analysis: string;
}

// Helper function to render text with **bold** markdown
const renderBoldText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  const sections = analysis.split(/\n\s*(?:1\.|2\.|3\.|4\.)\s*\*\*(.*?)\*\*\s*\n/);
  let introduction = "";
  const analysisSections: { title: string, content: string }[] = [];

  if (sections.length > 1) {
    introduction = sections[0].trim();
    for (let i = 1; i < sections.length; i += 2) {
      if (sections[i] && sections[i+1]) {
        analysisSections.push({ title: sections[i].trim(), content: sections[i+1].trim().replace(/^\s*:\s*/, '') });
      }
    }
  } else {
    // Fallback if the specific splitting doesn't work, treat whole analysis as introduction
    introduction = analysis;
  }

  return (
    <div className="mt-2 p-3 sm:p-6 bg-slate-700/50 border border-slate-600 rounded-lg shadow-lg">
      <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-amber-300 mb-4 sm:mb-6">Analiza Twojego Snu:</h2>
      
      {introduction && analysisSections.length === 0 && (
         <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
           {renderBoldText(introduction)}
         </div>
      )}

      {introduction && analysisSections.length > 0 && (
        <div className="mb-4 sm:mb-6 text-slate-200 leading-relaxed whitespace-pre-wrap italic">
          {renderBoldText(introduction)}
        </div>
      )}

      {analysisSections.map((section, index) => (
        <div key={index} className="mb-4 sm:mb-6 last:mb-0">
          <h3 className="font-heading text-xl sm:text-2xl text-amber-200 mb-2 sm:mb-3">{section.title}</h3>
          <div className="text-slate-200 leading-relaxed whitespace-pre-wrap pl-3 sm:pl-4 border-l-2 border-amber-400/50">
            {renderBoldText(section.content)}
          </div>
        </div>
      ))}
    </div>
  );
};