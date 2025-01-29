import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import cv2
import numpy as np
import os

class DocumentProcessor:
    def __init__(self):
        self.temp_folder = 'temp'
        if not os.path.exists(self.temp_folder):
            os.makedirs(self.temp_folder)

    def process_document(self, filepath, language='eng'):
        """Process document and extract text."""
        file_extension = filepath.split('.')[-1].lower()
        
        if file_extension == 'pdf':
            return self._process_pdf(filepath, language)
        else:
            return self._process_image(filepath, language)

    def _process_pdf(self, pdf_path, language):
        """Convert PDF to images and extract text."""
        try:
            pages = convert_from_path(pdf_path)
            text_results = []
            
            for i, page in enumerate(pages):
                # Save page as temporary image
                temp_image_path = os.path.join(self.temp_folder, f'page_{i}.png')
                page.save(temp_image_path, 'PNG')
                
                # Process the image
                page_text = self._process_image(temp_image_path, language)
                text_results.append(page_text)
                
                # Clean up temporary image
                os.remove(temp_image_path)
            
            return '\n\n'.join(text_results)
        
        except Exception as e:
            raise Exception(f"Error processing PDF: {str(e)}")

    def _process_image(self, image_path, language):
        """Process image and extract text."""
        try:
            # Read image
            image = cv2.imread(image_path)
            if image is None:
                raise Exception("Failed to load image")

            # Convert to grayscale
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # Apply thresholding to preprocess the image
            gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

            # Apply dilation to connect text components
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
            gray = cv2.dilate(gray, kernel, iterations=1)

            # Write the grayscale image to disk as temporary file
            temp_file = os.path.join(self.temp_folder, "temp_processed_image.png")
            cv2.imwrite(temp_file, gray)

            # Perform OCR
            text = pytesseract.image_to_string(Image.open(temp_file), lang=language)

            # Remove temporary file
            os.remove(temp_file)

            return text.strip()

        except Exception as e:
            raise Exception(f"Error processing image: {str(e)}")

    def __del__(self):
        """Cleanup temporary files on object destruction."""
        import shutil
        if os.path.exists(self.temp_folder):
            shutil.rmtree(self.temp_folder)