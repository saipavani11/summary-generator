import React from 'react';

const SummaryDisplay = ({ summary }) => {
  if (!summary || typeof summary !== 'string') return null;

  // Replace markdown-style bold (**) with HTML <strong>
  const formattedSummary = summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-2xl shadow-lg text-left animate-fade-in">
      <h3 className="text-lg font-semibold text-indigo-300 mb-3">📄 Summary</h3>
      <p
        className="text-gray-200 whitespace-pre-line leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: formattedSummary }}
      />
    </div>
  );
};

export default SummaryDisplay;
