import React from 'react';

interface BlockedModalProps {
  onClose: () => void; // Currently, close doesn't unblock, just hides.
}

export const BlockedModal: React.FC<BlockedModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blocked-modal-title"
    >
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-red-500">
        <h2 id="blocked-modal-title" className="text-3xl font-heading text-red-400 mb-4 text-center">
          Dostęp Zablokowany
        </h2>
        <p className="text-slate-300 text-center mb-6">
          Zostałeś zablokowany za naruszenie regulaminu korzystania z aplikacji.
        </p>
        <p className="text-slate-400 text-sm text-center mb-6">
          Ta aplikacja służy wyłącznie do analizy snów zgodnie z psychologią Junga.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-slate-600 hover:bg-slate-700 text-slate-100 font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Zamknij powiadomienie o zablokowaniu"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
};