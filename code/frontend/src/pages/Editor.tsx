import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Languages, Download, Loader2 } from "lucide-react";
import { translateText, convertFile } from "../services/api";

interface LocationState {
  text: string;
  originalLanguage: string;
}

export default function Editor() {
  const location = useLocation();
  const { text: initialText, originalLanguage } =
    (location.state as LocationState) || {
      text: "",
      originalLanguage: "",
    };

  const [text, setText] = useState(initialText);
  const [sourceLanguage, setSourceLanguage] = useState(originalLanguage);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [outputFormat, setOutputFormat] = useState("txt");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTextChange(newText: string) {
    setText(newText);
    setError(null);
  }

  async function handleTranslate() {
    if (!text) return;

    setIsProcessing(true);
    setIsTranslating(true);
    setError(null);

    try {
      const result = await translateText(text, sourceLanguage, targetLanguage);
      if (result.text) {
        handleTextChange(result.text);
        setSourceLanguage(targetLanguage);
      } else {
        throw new Error("No translation received");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      setError(
        error instanceof Error ? error.message : "Failed to translate text"
      );
    } finally {
      setIsProcessing(false);
      setIsTranslating(false);
    }
  }

  async function handleDownload() {
    if (!text) return;

    setIsProcessing(true);
    setIsDownloading(true);
    setError(null);

    try {
      const result = await convertFile(text, outputFormat, sourceLanguage);
      if (!result.file_data) {
        throw new Error("No file data received");
      }

      const binaryString = window.atob(result.file_data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type:
          outputFormat === "txt"
            ? "text/plain"
            : outputFormat === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `document.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError(
        error instanceof Error ? error.message : "Failed to download file"
      );
    } finally {
      setIsProcessing(false);
      setIsDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Edit Document
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <textarea
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              disabled={isProcessing}
              className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
              placeholder="Your text will appear here..."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Language
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  disabled={isProcessing || !text}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50"
                >
                  <option value="">Select Language</option>
                  <option value="ben">Bengali</option>
                  <option value="eng">English</option>
                  <option value="guj">Gujarati</option>
                  <option value="hin">Hindi</option>
                  <option value="kan">Kannada</option>
                  <option value="mal">Malayalam</option>
                  <option value="mar">Marathi</option>
                  <option value="ori">Odia</option>
                  <option value="pan">Punjabi</option>
                  <option value="tam">Tamil</option>
                  <option value="tel">Telugu</option>
                  <option value="urd">Urdu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  disabled={isProcessing || !text}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-50"
                >
                  <option value="txt">Plain Text (.txt)</option>
                  <option value="pdf">PDF Document (.pdf)</option>
                  <option value="docx">Word Document (.docx)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4">
                <button
                  onClick={handleTranslate}
                  disabled={isProcessing || !text || !targetLanguage}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors flex items-center justify-center space-x-2"
                >
                  {isTranslating ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <Languages className="h-5 w-5" />
                  )}
                  <span>Translate</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isProcessing || !text}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center justify-center space-x-2"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <Download className="h-5 w-5" />
                  )}
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
