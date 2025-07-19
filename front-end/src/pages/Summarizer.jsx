import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { summarizeContent, summarizeURL, summarizeAudio } from '../api';

import SummaryDisplay from '../components/SummaryDisply';

export default function Summarizer() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('idle');

  const handleBack = () => navigate(-1);

  const resetAllInputs = () => {
    setFile(null);
    setText('');
    setUrl('');
  };

  const isAnyOtherInputUsed = (type) => {
    return (
      (type !== 'file' && file) ||
      (type !== 'text' && text.trim()) ||
      (type !== 'url' && url.trim())
    );
  };

  const handleSubmit = async () => {
    try {
      setSummary('');
      setStatus('loading');

      if (url.trim()) {
        const response = await summarizeURL(url);
        setSummary(response.data.summary);
        setStatus('success');
        resetAllInputs();
        return;
      }

      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();

        if (['mp3', 'wav', 'm4a', 'ogg'].includes(extension)) {
          const response = await summarizeAudio(file);
          setSummary(response.data.summary);
          setStatus('success');
          resetAllInputs();
          return;
        }

        if (['pdf', 'txt', 'docx'].includes(extension)) {
          const response = await summarizeContent({ file, raw_text: '' });
          setSummary(response.data.summary);
          setStatus('success');
          resetAllInputs();
          return;
        }

        alert('Unsupported file format. Please upload PDF, TXT, DOCX, MP3, or WAV.');
        setStatus('idle');
        return;
      }

      if (text.trim()) {
        const response = await summarizeContent({ file: null, raw_text: text });
        setSummary(response.data.summary);
        setStatus('success');
        resetAllInputs();
        return;
      }

      alert('Please provide a file, text, or URL.');
      setStatus('idle');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || 'Something went wrong.');
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10 md:px-16 font-inter">
      <button
        onClick={handleBack}
        className="mb-8 text-indigo-400 hover:text-indigo-200 transition font-medium text-sm flex items-center gap-2"
      >
        <span className="text-xl">←</span> Back to Dashboard
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400 mb-4 animate-fade-in">
          Summarize Any Content
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Paste text or a URL, or upload PDF, TXT, DOCX, MP3, or WAV files.
        </p>
      </div>

      <div className="grid gap-10 max-w-3xl mx-auto animate-slide-up">

        {/* File Upload */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">📁 Upload a File</h3>
          <input
            type="file"
            accept=".pdf,.txt,.docx,.mp3,.wav,.m4a,.ogg"
            id="file-upload"
            onChange={(e) => {
              resetAllInputs();
              setFile(e.target.files[0]);
            }}
            className="hidden"
            disabled={isAnyOtherInputUsed('file')}
          />
          <label
            htmlFor="file-upload"
            className={`inline-block px-6 py-3 rounded-lg font-medium text-white ${
              isAnyOtherInputUsed('file')
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
            } transition`}
          >
            📌 Choose File
          </label>
          {file && (
            <div className="mt-3 text-sm text-indigo-300 flex items-center gap-2">
              <span className="truncate max-w-full font-medium">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="text-red-400 hover:text-red-200 transition text-lg"
                title="Remove file"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">✍️ Paste Raw Text</h3>
          <textarea
            rows={6}
            value={text}
            onChange={(e) => {
              resetAllInputs();
              setText(e.target.value);
            }}
            placeholder="Paste your content here..."
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-600"
            disabled={isAnyOtherInputUsed('text')}
          />
        </div>

        {/* URL Input */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">🔗 Enter a URL</h3>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              resetAllInputs();
              setUrl(e.target.value);
            }}
            placeholder="https://example.com/article"
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-600"
            disabled={isAnyOtherInputUsed('url')}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className={`px-10 py-3 rounded-xl text-lg font-semibold shadow-lg transition ${
              status === 'loading'
                ? 'bg-indigo-400 cursor-wait'
                : status === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          >
            {status === 'loading'
              ? '⏳ Generating...'
              : status === 'success'
              ? '✅ Generated!'
              : '🚀 Generate Summary'}
          </button>

          {/* Summary Output */}
          <SummaryDisplay summary={summary} />
        </div>
      </div>
    </div>
  );
}
