# Import the required libraries
import os
import shutil
from PIL.Image import Image
from typing import Dict, List
from pdf2image import convert_from_path

# Import the custom libraries
from .ocr_processor import OcrProcessor
from .image_preprocessor import ImagePreprocessor
from .text_postprocessor import TextPostprocessor

class DocumentProcessor:
    """
    A class for processing documents (pdf and images) and returning the extracted text.
    """
    def __init__(self):
        """
        Initializes the DocumentProcessor with a temporary folder.
        """
        # Construct the absolute path to the uploads directory
        uploads_dir: str = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads"))

        # Define the path of the temporary folder
        self.temp_folder: str = os.path.join(uploads_dir, "temp")

        # Create the folder if it does not exist
        if not os.path.exists(self.temp_folder):
            os.makedirs(self.temp_folder)

    def process_document(self, filepath: str, language: str = "auto") -> Dict[str, str]:
        """
        Processes a document (pdf or image) and extracts text.

        Args:
            filepath (str): The path to the document.
            language (str, optional): The language of the document. Defaults to "auto".

        Returns:
            Dict[str, str]: {"text": content_extracted, "language": content_language}

        Raises:
            Exception: If an error occurs during processing.
        """
        # Get the file extension
        file_extension: str = filepath.split(".")[-1].lower()
        
        # Process the document based on its file type (pdf or image)
        if file_extension == "pdf":
            return self._process_pdf(filepath, language)
        else:
            return self._process_image(filepath, language)

    def _process_pdf(self, pdf_path, language) -> Dict[str, str]:
        """
        Processes a pdf file by converting it to images and extracting text from each page.

        Args:
            pdf_path (str): The path to the pdf file.
            language (str): The language the pdf.

        Returns:
            Dict[str, str]: {"text": content_extracted, "language": content_language}

        Raises:
            Exception: If an error occurs during pdf processing.
        """
        try:
            # Convert pdf to a list of PIL Image objects
            pages: List[Image] = convert_from_path(pdf_path)

            # Handle no pages in pdf
            if not pages:
                return {"text": "", "language": language} 

            # Initialize empty lists to store text and language from each page
            text_results: list[str] = []
            language_results: list[str] = []
            
            # Iterate through the pages
            for i, page in enumerate(pages):
                # Save each page as a temporary png image
                temp_image_path: str = os.path.join(self.temp_folder, f"page_{i}.png")
                page.save(temp_image_path, "PNG")
                
                # Process the individual image (page) to extract text and language
                page_result: Dict[str, str] = self._process_image(temp_image_path, language)

                # Append the extracted text and language to the lists
                text_results.append(page_result["text"])
                language_results.append(page_result["language"])  
                
                # Clean up the temporary image file
                os.remove(temp_image_path)
            
            # Join the text from all pages with double newlines
            content_extracted: str = "\n\n".join(text_results)

            # Detect the most frequent language (fallback to provided language)
            if language_results:
                content_language: str = max(set(language_results), key=language_results.count)
            else:
                content_language: str = language

            # Return the content_extracted and content_language
            return {"text": content_extracted, "language": content_language}

        except Exception as e:
            raise Exception(f"Error processing pdf: {str(e)}")

    def _process_image(self, image_path: str, language: str):
        """
        Processes an image file and extracts text from the image.

        Args:
            image_path (str): The path to the image file.
            language (str): The language for OCR.

        Returns:
            Dict[str, str]: {"text": content_extracted, "language": content_language}

        Raises:
            Exception: If an error occurs during image processing.
        """
        try:
            # Create an instance of ImagePreprocessor class
            image_preprocessor: ImagePreprocessor = ImagePreprocessor(self.temp_folder)

            # Preprocess the image
            preprocessed_image_path: str = image_preprocessor.process(image_path)

            # Create an instance of OcrProcessor class
            ocr_processor: OcrProcessor = OcrProcessor(language)

            # Process the preprocessed image in ocr to extract the text
            ocr_text: str = ocr_processor.extract_text(preprocessed_image_path)
            
            # Create an instance of TextPostprocessor class
            text_postprocessor: TextPostprocessor = TextPostprocessor(language)

            # Postprocess the ocr text
            result: Dict[str, str] = text_postprocessor.process(ocr_text)

            # Destructure the result
            content_extracted: str = result["text"]
            content_language: str = result["language"]

            # Remove the preprocessed image
            os.remove(preprocessed_image_path)

            # Return the extracted text
            return {"text": content_extracted, "language": content_language}

        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")

    def __del__(self) -> None:
        """
        Cleanup temporary files when the DocumentProcessor object is destroyed.
        This is a destructor.
        """
        # Remove the entire temporary folder and its contents
        if os.path.exists(self.temp_folder):
            shutil.rmtree(self.temp_folder)

# For testing document_processor.py
if __name__ == "__main__":
    processor = DocumentProcessor()
    languages = ["ben", "eng", "guj", "hin", "kan", "mal", "mar", "ori", "pan", "tam", "tel", "urd"]

    for lang in languages:
        try:
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "images", f"{lang}.png"))
            
            if os.path.exists(image_path):
                extracted_text = processor.process_document(image_path, language=lang)
                print(f"Extracted Text from {lang}.png:\n{extracted_text['text']}\n")

            pdf_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "pdfs", f"{lang}.pdf"))

            if os.path.exists(pdf_path):
                extracted_text = processor.process_document(pdf_path, language=lang)
                print(f"Extracted Text from {lang}.pdf:\n{extracted_text['text']}\n")

        except Exception as e:
            print(f"Error processing {lang}: {str(e)}\n")
