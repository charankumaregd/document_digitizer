const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ExtractResponse {
  text: string;
  language: string;
}

export interface TranslateResponse {
  text: string;
}

export interface ConvertResponse {
  file_data: string;
  format: string;
}

export async function extractText(
  file: File,
  language: string
): Promise<ExtractResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  try {
    const response = await fetch(`${API_BASE_URL}/extract`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.text) {
      throw new Error("No text content received from server");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to process file");
  }
}

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        source_language: sourceLang,
        target_language: targetLang,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.text) {
      throw new Error("No translation received from server");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to translate text");
  }
}

export async function convertFile(
  text: string,
  format: string
): Promise<ConvertResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        format,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.file_data) {
      throw new Error("No file data received from server");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to convert file");
  }
}
