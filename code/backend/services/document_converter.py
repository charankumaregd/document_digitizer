# Import the required libraries
import os
import io
import base64
from fpdf import FPDF
from docx import Document
from docx.shared import Pt
from typing import IO, Dict
from docx.enum.text import WD_ALIGN_PARAGRAPH

class DocumentConverter:
    """
    A class for converting text to different document formats (txt, pdf, docx) 
    and returning the converted document as a base64 encoded string.
    """
    def __init__(self) -> None:
        """
        Initializes the DocumentConverter object with a fonts directory.
        """
        self.fonts_dir: str = os.path.abspath( os.path.join(os.path.dirname(__file__), "..", "fonts"))
        if not os.path.exists(self.fonts_dir):
            os.makedirs(self.fonts_dir)
    
        self.font_mappings: Dict[str, Dict[str, str]] = {
            "ben": {"name": "NotoSansBengali", "file": "NotoSansBengali-Regular.ttf"},
            "eng": {"name": "NotoSans", "file": "NotoSans-Regular.ttf"},
            "guj": {"name": "NotoSansGujarati", "file": "NotoSansGujarati-Regular.ttf"},
            "hin": {"name": "NotoSansDevanagari", "file": "NotoSansDevanagari-Regular.ttf"},
            "kan": {"name": "NotoSansKannada", "file": "NotoSansKannada-Regular.ttf"},
            "mal": {"name": "NotoSansMalayalam", "file": "NotoSansMalayalam-Regular.ttf"},
            "mar": {"name": "NotoSansDevanagari", "file": "NotoSansDevanagari-Regular.ttf"},
            "ori": {"name": "NotoSansOriya", "file": "NotoSansOriya-Regular.ttf"},
            "pun": {"name": "NotoSansGurmukhi", "file": "NotoSansGurmukhi-Regular.ttf"},
            "tam": {"name": "NotoSansTamil", "file": "NotoSansTamil-Regular.ttf"},
            "tel": {"name": "NotoSansTelugu", "file": "NotoSansTelugu-Regular.ttf"},
            "urd": {"name": "NotoNastaliqUrdu", "file": "NotoNastaliqUrdu-Regular.ttf"}
        }


    def convert(self, text: str, format_type: str, language: str = "eng") -> Dict[str, str]:
        """
        Convert text to specified document format and return base64 encoded string.
        
        Args:
            text (str): Text to convert
            format_type (str): Desired output format ("txt", "pdf", "docx")
            
        Returns:
            Dict[str, str]: {"file_data": base64_encoded_document_data, "format": converted_format}

        Raises:
            ValueError: If the format_type is not supported.
            Exception: If an error occurs during the conversion process.
        """
        try:
            if format_type == "txt":
                return {"file_data": self._convert_to_txt(text), "format": "txt"}
            elif format_type == "pdf":
                return {"file_data": self._convert_to_pdf(text, language), "format": "pdf"}
            elif format_type == "docx":
                return {"file_data": self._convert_to_docx(text, language), "format": "docx"}
            else:
                raise ValueError(f"Unsupported format: {format_type}")
        
        except Exception as e:
            raise Exception(f"Conversion error: {str(e)}")

    def _convert_to_txt(self, text: str) -> str:
        """
        Convert text to txt format.

        Args:
            text (str): Text to convert
        
        Returns:
            str: Base64 encoded document data

        Raises:
            Exception: If an error occurs during the conversion process.
        """
        try:
            # Encode the text to bytes using UTF-8
            text_bytes: bytes = text.encode("utf-8")

            # Base64 encode the bytes and decode to string
            base64_encoded: str = base64.b64encode(text_bytes).decode("utf-8")

            # Returns Base64 encoded document data
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to txt: {str(e)}")

    def _convert_to_pdf(self, text: str, language: str = "eng") -> str:
        """
        Convert text to pdf format.

        Args:
            text (str): Text to convert
        
        Returns:
            str: Base64 encoded document data

        Raises:
            Exception: If an error occurs during the conversion process.
        """

        try:
            # Create a new pdf object
            pdf: FPDF = FPDF()

            # Add a new page
            pdf.add_page()

            # Get the appropriate font for the language
            font_data: Dict[str, str] = self.font_mappings.get(language, {"name": "Arial", "file": None})
            font_name: str = font_data["name"]
            font_file: str = font_data.get("file")
            
            # Load custom font or default to arial
            if font_file:
                font_path: str = os.path.join(self.fonts_dir, font_file)
                pdf.add_font(font_name, "", font_path, uni=True)
                pdf.set_font(font_name, size=12)
            else:
                pdf.set_font("Arial", size=12)

            # Add text content line by line
            for line in text.splitlines():
                pdf.multi_cell(0, 10, txt=line)

            # Generate PDF bytes and encode in base64
            pdf_bytes: bytes = pdf.output(dest="S").encode("latin-1")

            # Base64 encode the bytes and decode to string
            base64_encoded: str = base64.b64encode(pdf_bytes).decode("utf-8")

            # Returns Base64 encoded document data
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to pdf: {str(e)}")

    def _convert_to_docx(self, text: str, language: str = "eng") -> str:
        """
        Convert text to docx format.

        Args:
            text (str): Text to convert
        
        Returns:
            str: Base64 encoded document data

        Raises:
            Exception: If an error occurs during the conversion process.
        """
        try:
            # Create a new docx document
            docx: Document = Document()
            
            # Load custom font or default to arial
            font_data: Dict[str, str] = self.font_mappings.get(language, {"name": "Arial"})
            font_name: str = font_data["name"]
            
            # Set default font
            style = docx.styles["Normal"]
            style.font.name = font_name
            style.font.size = Pt(12)
            
            # Add the text as a paragraph
            paragraph = docx.add_paragraph(text)

            # Align right for urdu
            if language == "urd":
                paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT

            # Create an in-memory byte stream
            buffer: IO[bytes] = io.BytesIO()

            # Save the document to the buffer
            docx.save(buffer)

            # Reset the buffer"s position to the beginning
            buffer.seek(0)

            # Get the bytes from the buffer
            docx_bytes: bytes = buffer.getvalue()

            # Base64 encode the bytes and decode to string
            base64_encoded: str = base64.b64encode(docx_bytes).decode("utf-8")

            # Returns Base64 encoded document data
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to docx: {str(e)}")

# For testing document_converter.py
if __name__ == "__main__":
    converter = DocumentConverter()
    
    test_texts = {
        "ben": "হ্যালো, কেমন আছেন?",  # Bengali
        "eng": "Hello, how are you?",  # English
        "guj": "હેલો, તમે કેમ છો?",  # Gujarati
        "hin": "नमस्ते, आप कैसे हैं?",  # Hindi
        "kan": "ಹಲೋ, ಹೇಗಿದ್ದೀರಾ?",  # Kannada
        "mal": "ഹലോ, നിങ്ങൾക്ക് സുഖമാണോ?",  # Malayalam
        "mar": "हॅलो, तू कसा आहेस?",  # Marathi
        "ori": "ନମସ୍କାର, ଆପଣ କେମିତି ଅଛନ୍ତି?",  # Odia
        "pun": "ਹੈਲੋ ਤੁਸੀ ਕਿਵੇਂ ਹੋ?",  # Punjabi
        "tam": "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?",  # Tamil
        "tel": "హలో, మీరు ఎలా ఉన్నారు?",  # Telugu
        "urd": "ہیلو ، آپ کیسے ہیں؟"  # Urdu
    }
    
    for lang_code, text in test_texts.items():
        print(f"\nTesting language: {lang_code}")
        
        try:
            txt_data = converter.convert(text, "txt", lang_code)
            print(f"Txt Conversion successful for {lang_code}. First 20 characters: {txt_data['file_data'][:20]}")
            
            pdf_data = converter.convert(text, "pdf", lang_code)
            print(f"Pdf Conversion successful for {lang_code}. First 20 characters: {pdf_data['file_data'][:20]}")
            
            docx_data = converter.convert(text, "docx", lang_code)
            print(f"Docx Conversion successful for {lang_code}. First 20 characters: {docx_data['file_data'][:20]}")
            
        except Exception as e:
            print(f"An error occurred for {lang_code}: {e}")
