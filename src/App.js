import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  MessageSquare, 
  History, 
  User, 
  LogOut, 
  Search,
  Download,
  Trash2,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Eye,
  Menu,
  X,
  Home,
  Globe,
  Mic,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

import './App.css';
// import App from './App';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for demonstration
  const [summaries, setSummaries] = useState([
    { id: 1, title: 'Research Paper Analysis', type: 'pdf', date: '2024-01-15', summary: 'This research paper explores the applications of machine learning in healthcare...', questions: ['What are the main findings?', 'How was the data collected?'] },
    { id: 2, title: 'Meeting Recording', type: 'audio', date: '2024-01-14', summary: 'The team discussed project milestones and upcoming deadlines...', questions: ['What were the action items?', 'Who is responsible for what?'] }
  ]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Documents Into 
            <span className="text-blue-600"> Actionable Insights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload PDFs, text files, or audio recordings and get intelligent summaries 
            with AI-powered question answering. Process documents faster than ever before.
          </p>
          <div className="flex justify-center space-x-4 mb-16">
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

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Upload className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Multi-Format Support</h3>
            <p className="text-gray-600">Upload PDFs, text files, audio recordings, or even paste URLs for web scraping.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">AI-Powered Q&A</h3>
            <p className="text-gray-600">Ask questions about your documents and get instant, accurate answers powered by AI.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <History className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-4">Smart History</h3>
            <p className="text-gray-600">Access all your processed documents and summaries in one organized dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  );

  // Authentication Components
  const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setUser({ name: 'John Doe', email: formData.email });
        setCurrentPage('dashboard');
        showNotification('Login successful!');
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? <Loader className="animate-spin h-5 w-5" /> : 'Sign in'}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentPage('signup')}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setUser({ name: formData.name, email: formData.email });
        setCurrentPage('dashboard');
        showNotification('Account created successfully!');
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? <Loader className="animate-spin h-5 w-5" /> : 'Sign up'}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Navigation Component
  const Navbar = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">DocuMind</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('upload')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'upload' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'history' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <History className="h-4 w-4 mr-2" />
              History
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('profile')}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">{user?.name}</span>
            </button>
            <button
              onClick={() => {
                setUser(null);
                setCurrentPage('landing');
                showNotification('Logged out successfully');
              }}
              className="text-gray-700 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setCurrentPage('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('upload');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              Upload
            </button>
            <button
              onClick={() => {
                setCurrentPage('history');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              History
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your documents.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <FileText className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{summaries.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <MessageSquare className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Questions Asked</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">4.2h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
          <div className="space-y-4">
            {summaries.slice(0, 3).map((summary) => (
              <div key={summary.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{summary.title}</p>
                    <p className="text-sm text-gray-500">{summary.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('result')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentPage('upload')}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload New Document
            </button>
            <button
              onClick={() => setCurrentPage('history')}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <History className="h-5 w-5 mr-2" />
              View All History
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Upload Component
  const UploadPage = () => {
    const [uploadType, setUploadType] = useState('file');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
      }
    };

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!file && !url) return;
      
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentPage('result');
        showNotification('Document processed successfully!');
      }, 3000);
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
          <p className="text-gray-600">Upload your document to get an AI-powered summary and ask questions.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Upload Type Selector */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setUploadType('file')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  uploadType === 'file' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="h-4 w-4 mr-2 inline" />
                File Upload
              </button>
              <button
                onClick={() => setUploadType('url')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  uploadType === 'url' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="h-4 w-4 mr-2 inline" />
                Web URL
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {uploadType === 'file' ? (
              <div>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="mt-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drop your file here or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Supports PDF, TXT, DOCX, MP3, WAV, and more
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Choose File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.txt,.docx,.mp3,.wav,.ogg"
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter a URL to scrape and analyze the content
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isProcessing || (!file && !url)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Process Document
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Result Component
  const ResultPage = () => {
    const [activeTab, setActiveTab] = useState('summary');
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isAsking, setIsAsking] = useState(false);

    const handleAskQuestion = (e) => {
      e.preventDefault();
      if (!question.trim()) return;

      setIsAsking(true);
      const userMessage = { type: 'user', content: question };
      setChatHistory(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const botMessage = { 
          type: 'bot', 
          content: 'Based on the document, this appears to be related to the research methodology discussed in section 2.1. The authors mention that data was collected through structured interviews and validated using statistical analysis.'
        };
        setChatHistory(prev => [...prev, botMessage]);
        setIsAsking(false);
      }, 1500);
      
      setQuestion('');
    };

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Analysis Results</h1>
          <p className="text-gray-600">Review your document summary and ask questions about the content.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'summary'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'qa'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Q&A Chat
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'summary' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Document Summary</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      This research paper explores the applications of machine learning in healthcare, 
                      specifically focusing on diagnostic imaging and patient outcome prediction. The study 
                      presents a comprehensive analysis of various ML algorithms including deep learning, 
                      random forests, and support vector machines applied to medical datasets.
                    </p>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Key findings include a 15% improvement in diagnostic accuracy when using ensemble 
                      methods compared to traditional approaches. The research also highlights the importance 
                      of data preprocessing and feature selection in achieving optimal model performance.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Machine learning shows significant promise in healthcare diagnostics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Ensemble methods outperform individual algorithms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">Data quality is crucial for model performance</span>
                    </li>
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('qa')}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask Questions
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'qa' &&( 
              <div className="h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Ask any question about your document</p>
                    </div>
                  ) : (
                    chatHistory.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}

                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isAsking && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <Loader className="animate-spin h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAskQuestion} className="flex space-x-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about your document..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={isAsking || !question.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // History Component
  const HistoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredSummaries = summaries.filter(summary => {
      const matchesSearch = summary.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || summary.type === filterType;
      return matchesSearch && matchesFilter;
    });

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document History</h1>
          <p className="text-gray-600">Access all your processed documents and summaries.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          {/* Search and Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="audio">Audio</option>
                  <option value="text">Text</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document List */}
          <div className="divide-y divide-gray-200">
            {filteredSummaries.map((summary) => (
              <div key={summary.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {summary.type === 'pdf' && <FileText className="h-8 w-8 text-red-500" />}
                      {summary.type === 'audio' && <Volume2 className="h-8 w-8 text-green-500" />}
                      {summary.type === 'text' && <FileText className="h-8 w-8 text-blue-500" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{summary.title}</h3>
                      <p className="text-sm text-gray-500">{summary.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage('result')}
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm text-green-600 hover:text-green-800">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 text-sm line-clamp-2">
                    {summary.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Profile Component
  const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      notifications: true,
      autoSave: true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      showNotification('Profile updated successfully!');
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p className="text-sm text-gray-500">Receive notifications about document processing</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.notifications}
                      onChange={(e) => setProfileData({ ...profileData, notifications: e.target.checked })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Auto-save Summaries</label>
                      <p className="text-sm text-gray-500">Automatically save summaries to your history</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={profileData.autoSave}
                      onChange={(e) => setProfileData({ ...profileData, autoSave: e.target.checked })}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // 404 Error Page
  const ErrorPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="h-24 w-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => setCurrentPage(user ? 'dashboard' : 'landing')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );

  // Notification Component
  const Notification = ({ message, type, onClose }) => (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Main App Render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Navigation */}
      {user && currentPage !== 'landing' && <Navbar />}

      {/* Main Content */}
      <main>
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'signup' && <SignupPage />}
        {currentPage === 'dashboard' && user && <Dashboard />}
        {currentPage === 'upload' && user && <UploadPage />}
        {currentPage === 'result' && user && <ResultPage />}
        {currentPage === 'history' && user && <HistoryPage />}
        {currentPage === 'profile' && user && <ProfilePage />}
        {currentPage === 'error' && <ErrorPage />}
      </main>
    </div>
  );
};

export default App;