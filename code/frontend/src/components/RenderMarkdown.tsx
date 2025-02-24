import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface RenderMarkdownProps {
  filePath?: string;
  md?: string;
}

export default function RenderMarkdown({ filePath, md }: RenderMarkdownProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (filePath) {
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `${response.status}: ${response.statusText}, Failed to load data.`
            );
          }
          return response.text();
        })
        .then((text) => {
          setContent(text);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else if (md) {
      setContent(md);
      setIsLoading(false);
    } else {
      setContent("");
      setIsLoading(false);
    }
  }, [filePath, md]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
