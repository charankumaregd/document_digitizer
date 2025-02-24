import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FileText, FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { extractText } from "@/services/api";
import { Label } from "@/components/ui/label";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [fileLanguage, setFileLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [fileDropError, setFileDropError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      setFileDropError("Only one file can be uploaded at a time.");
      setProcessingError(null);
      return;
    }
    if (acceptedFiles.length === 1) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  async function handleSubmit() {
    if (!file) return;

    setFileDropError(null);
    setIsProcessing(true);
    setProcessingError(null);

    try {
      const result = await extractText(file, fileLanguage);
      navigate("/editor", {
        state: {
          text: result.text,
          originalLanguage: result.language,
        },
      });
    } catch (error) {
      console.error("Error processing file:", error);
      setProcessingError(
        error instanceof Error ? error.message : "Failed to process file"
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <main>
      <div className="py-8 space-y-8">
        {/* heading */}
        <h1 className="text-2xl font-bold">Upload Document</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* filedrop area */}
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center w-full h-64
          text-muted-foreground bg-primary-foreground
          border-2 border-dashed hover:border-ring rounded-lg 
          p-8 space-y-2 cursor-pointer transition-colors
          ${isDragActive ? "border-ring" : ""}
          ${file ? "" : ""}`}
          >
            <Input {...getInputProps()} />
            {file ? (
              <>
                <FileText />
                <span className="text-sm font-medium">{file.name}</span>
                <span className="text-xs">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </>
            ) : (
              <>
                <FileUp />
                <span className="text-sm font-medium">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs">PNG, JPG, JPEG</span>
              </>
            )}
          </div>

          <div className="flex flex-col w-fit space-y-8">
            {/* select language */}
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium">File Language</Label>
              <Select onValueChange={setFileLanguage} value={fileLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto detect</SelectItem>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="hin">Hindi</SelectItem>
                  <SelectItem value="kan">Kannada</SelectItem>
                  <SelectItem value="mal">Malayalam</SelectItem>
                  <SelectItem value="tam">Tamil</SelectItem>
                  <SelectItem value="tel">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* continue button */}
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !file || !fileLanguage}
              className="flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Process Document</span>
              )}
            </Button>
          </div>
        </div>

        {/* filedrop error */}
        {fileDropError && (
          <div className="border border-destructive rounded-md w-fit px-4 py-2">
            <span className="text-destructive-foreground">{fileDropError}</span>
          </div>
        )}

        {/* processing error */}
        {processingError && (
          <div className="border border-destructive rounded-md w-fit px-4 py-2">
            <span className="text-destructive-foreground">
              {processingError}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
