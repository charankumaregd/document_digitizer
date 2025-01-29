from googletrans import Translator as GoogleTranslator

class Translator:
    def __init__(self):
        self.translator = GoogleTranslator()

    def translate(self, text, source_lang='auto', target_lang='en'):
        """
        Translate text from source language to target language.
        
        Args:
            text (str): Text to translate
            source_lang (str): Source language code (default: auto-detect)
            target_lang (str): Target language code
            
        Returns:
            str: Translated text
        """
        try:
            if not text:
                return ""
            
            # Convert language codes to match googletrans format
            source_lang = self._convert_language_code(source_lang)
            target_lang = self._convert_language_code(target_lang)
            
            result = self.translator.translate(
                text,
                src=source_lang,
                dest=target_lang
            )
            
            return result.text
        
        except Exception as e:
            raise Exception(f"Translation error: {str(e)}")

    def _convert_language_code(self, code):
        """Convert ISO language codes to googletrans format."""
        code = code.lower()
        code_mapping = {
            'eng': 'en',
            'fra': 'fr',
            'deu': 'de',
            'spa': 'es',
            # Add more mappings as needed
        }
        return code_mapping.get(code, code)