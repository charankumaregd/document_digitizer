import base64
from fpdf import FPDF
from docx import Document
import io

class FileConverter:
    def convert(self, text, format_type):
        """
        Convert text to specified file format and return base64 encoded string.
        
        Args:
            text (str): Text to convert
            format_type (str): Desired output format ('txt', 'pdf', 'docx')
            
        Returns:
            str: Base64 encoded file data
        """
        try:
            if format_type == 'txt':
                return self._convert_to_txt(text)
            elif format_type == 'pdf':
                return self._convert_to_pdf(text)
            elif format_type == 'docx':
                return self._convert_to_docx(text)
            else:
                raise ValueError(f"Unsupported format: {format_type}")
        
        except Exception as e:
            raise Exception(f"Conversion error: {str(e)}")

    def _convert_to_txt(self, text):
        """Convert text to txt format."""
        try:
            # Convert string to bytes
            text_bytes = text.encode('utf-8')
            # Encode to base64
            base64_encoded = base64.b64encode(text_bytes).decode('utf-8')
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to TXT: {str(e)}")

    def _convert_to_pdf(self, text):
        """Convert text to PDF format."""
        try:
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=12)
            
            # Split text into lines and add to PDF
            lines = text.split('\n')
            for line in lines:
                pdf.multi_cell(0, 10, txt=line)
            
            # Get PDF as bytes
            pdf_bytes = pdf.output(dest='S').encode('latin-1')
            # Encode to base64
            base64_encoded = base64.b64encode(pdf_bytes).decode('utf-8')
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to PDF: {str(e)}")

    def _convert_to_docx(self, text):
        """Convert text to DOCX format."""
        try:
            docx = Document()
            docx.add_paragraph(text)
            
            # Save document to bytes buffer
            buffer = io.BytesIO()
            docx.save(buffer)
            buffer.seek(0)
            
            # Get bytes and encode to base64
            docx_bytes = buffer.getvalue()
            base64_encoded = base64.b64encode(docx_bytes).decode('utf-8')
            return base64_encoded
        
        except Exception as e:
            raise Exception(f"Error converting to DOCX: {str(e)}")