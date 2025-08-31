// pages/LandingPage.js
import React from 'react';
import { FileText, Upload, MessageSquare, History } from 'lucide-react';

const LandingPage = ({ setCurrentPage }) => {
  const features = [
    {
      icon: Upload,
      title: 'Multi-Format Support',
      description: 'Upload PDFs, text files, audio recordings, or even paste URLs for web scraping.'
    },
    {
      icon: MessageSquare,
      title: 'AI-Powered Q&A',
      description: 'Ask questions about your documents and get instant, accurate answers powered by AI.'
    },
    {
      icon: History,
      title: 'Smart History',
      description: 'Access all your processed documents and summaries in one organized dashboard.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">DocuMind</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('login')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => setCurrentPage('signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Documents Into 
            <span className="text-blue-600"> Actionable Insights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload PDFs, text files, or audio recordings and get intelligent summaries 
            with AI-powered question answering. Process documents faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => setCurrentPage('signup')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Get Started Free
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Login
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already saving time with DocuMind.
          </p>
          <button
            onClick={() => setCurrentPage('signup')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Free Trial
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;