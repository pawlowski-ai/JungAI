import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mt-6 p-4 bg-red-800/50 border border-red-600 text-red-200 rounded-lg shadow-md" role="alert">
      <p className="font-semibold text-red-100">Wystąpił problem:</p>
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  );
};