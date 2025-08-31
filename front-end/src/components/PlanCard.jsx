// src/components/PlanCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PlanCard({ title, features, path, buttonText, button }) {
  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 w-full max-w-sm flex flex-col justify-between border border-gray-700 transition-transform hover:scale-[1.02] duration-200">
      <div>
        <h3 className="text-2xl font-bold text-indigo-400 mb-5">{title}</h3>
        <ul className="list-disc list-inside space-y-3 text-gray-300 text-sm leading-relaxed">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        {button ? (
          <div className="flex justify-center">
            {React.cloneElement(button, {
              className:
                'min-w-[120px] px-5 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-200',
            })}
          </div>
        ) : (
          <Link to={path} className="inline-block">
            <button
              className="min-w-[120px] px-5 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
              aria-label={`Select ${title} plan`}
            >
              {buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
