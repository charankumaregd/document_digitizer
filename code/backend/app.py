# Import the required libraries
import os
from typing import Dict
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

# Import the custom libraries
from services.text_translator import TextTranslator
from services.text_postprocessor import TextPostprocessor
from services.document_converter import DocumentConverter
from services.document_processor import DocumentProcessor

# Create flask app
app: Flask = Flask(__name__)

# Use cors
CORS(app)

# Configuration
UPLOAD_FOLDER: str = "uploads"
ALLOWED_EXTENSIONS: set[str] = {"pdf", "png", "jpg", "jpeg"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename: str) -> bool:
    """
    Verifies if the uploaded file has an allowed extension.

    Args:
        filename (str): The filename to check.
    
    Returns:
        bool: True if the file is allowed, False otherwise.
    """
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Default route
@app.route("/", methods=["GET"])
def index() -> Dict[str, str]:
    return jsonify({"message": "Server is running"})

# Api routes

# Extract the content
@app.route("/api/extract", methods=["POST"])
def extract() -> Dict[str, str]:
    """
    Extract the content from the document.
    
    Returns:
        Dict[str, str]: {"text": content_extracted, "language": content_language}
    """
    try:
        # Check if the file exists in request.files
        if "file" not in request.files:
            return jsonify({"error": "Missing required field: file"}), 400

        # Get the file and language from request
        file: FileStorage = request.files["file"]
        language: str = request.form.get("language", "")  # Default to ""

        # Check for "" explicitly
        if language == "":
            language = "auto"
        
        # Check filename for "" explicitly
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400
        
        if not allowed_file(file.filename):
            return jsonify({"error": "File type not allowed"}), 400

        # Store the file in upload folder
        filename: str = secure_filename(file.filename)
        filepath: str = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Create an instance of the DocumentProcessor class
        processor: DocumentProcessor = DocumentProcessor()

        # Process the document to extract content
        result: Dict[str, str] = processor.process_document(filepath, language)

        # Destructure the result
        content_extracted: str = result["text"]
        content_language: str = result["language"]
    
        # Clean up the uploaded file
        os.remove(filepath)

        # Return the extracted text and language
        return jsonify({"text": content_extracted, "language": content_language}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Translate the content
@app.route("/api/translate", methods=["POST"])
async def translate() -> Dict[str, str]:
    """
    Translate the content to target language.
    
    Returns:
        Dict[str, str]: {"text": translated_postprocessed_text}
    """
    try:
        # Get the request (text, source language and target language)
        data: Dict[str, str] = request.get_json()

        # Check if the required fields exists in data
        required_fields: list[str] = ["text", "source_language", "target_language"]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Destructure the data
        text: str = data["text"]
        source_language: str = data["source_language"]
        target_language: str = data["target_language"]

        # Create an instance of the TextTranslator class
        translator: TextTranslator = TextTranslator()

        # Translate to target language
        translated_text: str = await translator.translate(text, source_language, target_language)

        # Create an instance of TextPostprocessor class
        text_postprocessor: TextPostprocessor = TextPostprocessor(target_language)

        # Postprocess the translated text
        result: Dict[str, str] = text_postprocessor.process(translated_text)
        
        # Destructure the postprocessed text
        translated_postprocessed_text: str = result["text"]

        # Return the postprocessed text
        return jsonify({"text": translated_postprocessed_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Convert to document
@app.route("/api/convert", methods=["POST"])
def convert() -> Dict[str, str]:
    """
    Convert the document to required format.
    
    Returns:
        Dict[str, str]: {"file_data": converted_file_data, "format": converted_format}
    """
    try:
        # Get the request (text and format)
        data: Dict[str, str] = request.get_json()

        # Check if the required fields exists in data
        required_fields: list[str] = ["text", "format", "language"]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Destructure the data
        text: str = data["text"]
        format: str = data["format"]
        language: str = data["language"]

        # Create an instance of the DocumentConverter class
        document_converter: DocumentConverter = DocumentConverter()

        # Convert the document to required format
        result: Dict[str, str] = document_converter.convert(text, format, language)

        # Destructure the result
        converted_file_data: str = result["file_data"]
        converted_format: str = result["format"]

        # Return converted file data and converted format
        return jsonify({"file_data": converted_file_data, "format": converted_format}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Entry point
if __name__ == "__main__":
    app.run(debug=True)