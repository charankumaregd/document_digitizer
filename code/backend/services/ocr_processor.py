# Import the required libraries
import os
import pytesseract
from PIL import Image
from PIL.ImageFile import ImageFile

class OcrProcessor:
    """
    A class for performing Optical Character Recognition (OCR) on images.
    """
    CONFIG: str = "--psm 6 --oem 1"

    def __init__(self, language: str = "eng") -> None:
        """
        Initializes the OcrProcessor with a specified language. Defaults to English ("eng").
        """
        self.language: str = language

    def extract_text(self, image_path: str) -> str:
        """
        Extracts text from an image using pytesseract.

        Args:
            image_path: The path to the image file.

        Returns:
            The extracted text as a string.
        """
        # Handles image path not exists
        if not os.path.exists(image_path):
            return f"Error: File {image_path} not found."
        
        # Read the image
        image: ImageFile = Image.open(image_path)

        # Handles language set to "auto"
        if self.language == "auto":
            ocr_text: str = pytesseract.image_to_string(image, config=self.CONFIG)
        else:
            ocr_text: str = pytesseract.image_to_string(image, lang=self.language, config=self.CONFIG)

        # Returns the ocr text
        return ocr_text.strip()

# For testing ocr_processor.py
if __name__ == "__main__":
    languages = ["ben", "eng", "guj", "hin", "kan", "mal", "mar", "ori", "pan", "tam", "tel", "urd"]
    for lang in languages:
        try:
            image_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "assets", "images", f"{lang}.png"))
            ocr_processor = OcrProcessor(language=lang)
            extracted_text = ocr_processor.extract_text(image_path)
            print(f"Extracted Text ({lang}): {extracted_text}\n")
        except Exception as e:
            print(f"Error in processing {image_path}: {str(e)}\n")