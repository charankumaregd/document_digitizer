import { useNavigate } from 'react-router-dom';
import { FileText, Languages, Download } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Document Digitizer</h1>
          <p className="text-xl text-gray-600 mb-12">
            Transform your documents into editable text with AI-powered OCR and translation
          </p>

          <button
            onClick={() => navigate('/upload')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Digitizing
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <FileText className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">OCR Technology</h3>
              <p className="text-gray-600">
                Extract text from images and PDFs with high accuracy
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Languages className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Translation</h3>
              <p className="text-gray-600">
                Translate your documents into multiple languages
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Download className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Export</h3>
              <p className="text-gray-600">
                Download your documents in various formats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}