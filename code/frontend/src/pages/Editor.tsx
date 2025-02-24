import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Languages, Loader2, FileDown } from "lucide-react";
import { translateText, convertFile } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [outputFormat, setOutputFormat] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTextChange(newText: string) {
    setText(newText);
    setError(null);
  }

  async function handleTranslate() {
    if (!text) return;

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
      setIsTranslating(false);
    }
  }

  async function handleDownload() {
    if (!text) return;

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
      setIsDownloading(false);
    }
  }

  return (
    <main>
      <div className="py-8 space-y-8">
        {/* heading */}
        <h1 className="text-2xl font-bold">Edit Document</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* text area */}
          <Textarea
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            disabled={isTranslating || isDownloading}
            placeholder="Your text will appear here..."
            className="bg-primary-foreground max-w-4xl"
          />

          <div className="flex flex-col w-fit space-y-8">
            {/* select target language */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium">Target Language</Label>
              <Select
                onValueChange={setTargetLanguage}
                disabled={isTranslating || isDownloading || !text}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="hin">Hindi</SelectItem>
                  <SelectItem value="kan">Kannada</SelectItem>
                  <SelectItem value="mal">Malayalam</SelectItem>
                  <SelectItem value="tam">Tamil</SelectItem>
                  <SelectItem value="tel">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* select output format */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium">Output Format</Label>
              <Select
                onValueChange={setOutputFormat}
                disabled={isTranslating || isDownloading || !text}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                  <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                  <SelectItem value="docx">Word Document (.docx)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* translate button */}
            <Button
              onClick={handleTranslate}
              disabled={
                isTranslating || isDownloading || !text || !targetLanguage
              }
            >
              {isTranslating ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Languages />
                  <span>Translate</span>
                </>
              )}
            </Button>

            {/* download button */}
            <Button
              onClick={handleDownload}
              disabled={
                isDownloading || isTranslating || !text || !outputFormat
              }
            >
              {isDownloading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <FileDown />
                  <span>Download</span>
                </>
              )}
            </Button>
          </div>

          {/* error */}
          {error && (
            <div className="border border-destructive rounded-md w-fit px-4 py-2">
              <span className="text-destructive-foreground">{error}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
