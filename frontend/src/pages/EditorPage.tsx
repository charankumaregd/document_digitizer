import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Languages, Download, Undo, FileText } from 'lucide-react';

interface LocationState {
  text: string;
  originalLanguage: string;
}

export default function EditorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { text: initialText, originalLanguage } = (location.state as LocationState) || {
    text: '',
    originalLanguage: 'eng'
  };

  const [text, setText] = useState(initialText);
  const [targetLanguage, setTargetLanguage] = useState('eng');
  const [outputFormat, setOutputFormat] = useState('txt');
  const [history, setHistory] = useState<string[]>([initialText]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTextChange = (newText: string) => {
    setText(newText);
    setHistory([...history.slice(0, currentIndex + 1), newText]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setText(history[currentIndex - 1]);
    }
  };

  const handleTranslate = async () => {
    try {
      // TODO: Send to backend for translation
      // For now, just show a mock translation
      const translatedText = `Translated: ${text}`;
      handleTextChange(translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const handleDownload = () => {
    try {
      // For now, only support txt format until backend is ready
      if (outputFormat !== 'txt') {
        alert(`${outputFormat.toUpperCase()} format requires backend processing. Currently only TXT format is available.`);
        return;
      }

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `document.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Document</h1>
            <button
              onClick={handleUndo}
              disabled={currentIndex === 0}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400"
              title="Undo"
            >
              <Undo className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your text will appear here..."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="eng">English</option>
                  <option value="fra">French</option>
                  <option value="deu">German</option>
                  <option value="spa">Spanish</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="txt">Plain Text (.txt)</option>
                  <option value="doc">Word Document (.doc)</option>
                  <option value="pdf">PDF Document (.pdf)</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleTranslate}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Languages className="h-5 w-5" />
                  <span>Translate</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}