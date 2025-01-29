from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from services.document_processor import DocumentProcessor
from services.translator import Translator
from services.file_converter import FileConverter

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/extract', methods=['POST'])
def extract_text():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        language = request.form.get('language', 'eng')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        processor = DocumentProcessor()
        text = processor.process_document(filepath, language)
        
        # Clean up the uploaded file
        os.remove(filepath)
        
        return jsonify({
            'text': text,
            'language': language
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/translate', methods=['POST'])
def translate_text():
    try:
        data = request.get_json()
        if not data or 'text' not in data or 'target_language' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        translator = Translator()
        translated_text = translator.translate(
            data['text'],
            data.get('source_language', 'auto'),
            data['target_language']
        )
        
        return jsonify({'text': translated_text})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/convert', methods=['POST'])
def convert_file():
    try:
        data = request.get_json()
        if not data or 'text' not in data or 'format' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        converter = FileConverter()
        file_data = converter.convert(data['text'], data['format'])
        
        return jsonify({
            'file_data': file_data,
            'format': data['format']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)