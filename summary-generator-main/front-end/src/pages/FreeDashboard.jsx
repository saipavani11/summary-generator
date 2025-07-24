import { useState } from 'react';
import { uploadFile } from '../api';
import { toast } from 'react-toastify';
import SummaryDisplay from '../components/SummaryDisply';

export default function FreeDashboard() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ];

    if (!allowedTypes.includes(selected.type)) {
      toast.error('Only PDF, TXT, DOC, and DOCX files are supported.');
      return;
    }

    setFile(selected);
    setText('');
    setResult(null);
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (file) setFile(null);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file && !text.trim()) {
      toast.error('Please upload a document or paste some text.');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text.trim()) formData.append('raw_text', text.trim());

    try {
      setSubmitting(true);
      const res = await uploadFile(formData);
      setResult(res.data);
      setFile(null);
      setText('');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Something went wrong.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-indigo-400 mb-12">
          Free Summary Generator
        </h1>

        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl space-y-8">

          {/* Text Input */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-300">
              Paste Text
            </label>
            <textarea
              placeholder="Paste your paragraph here..."
              className={`w-full rounded-xl p-4 bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition resize-none ${
                text ? 'h-40' : 'h-20'
              } ${file ? 'opacity-40 cursor-not-allowed' : ''}`}
              value={text}
              onChange={handleTextChange}
              disabled={!!file}
            />
            {file && (
              <p className="text-sm text-yellow-400 mt-1">
                ⚠️ Text input is disabled because a file is selected.
              </p>
            )}
          </div>

          {/* File Input */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-300">
              Upload Document
            </label>
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              disabled={!!text.trim()}
              className={`w-full file:bg-indigo-600 file:text-white file:rounded-md file:px-4 file:py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer transition ${
                text.trim() ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
            {text.trim() && (
              <p className="text-sm text-yellow-400 mt-1">
                ⚠️ File upload is disabled because text is already entered.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-white font-semibold text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? 'Generating...' : 'Generate Summary'}
            </button>
          </div>
        </div>

        {/* Summary Result */}
        {result && <SummaryDisplay summary={result.summary} />}
      </div>
    </div>
  );
}
