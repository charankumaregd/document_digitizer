# Import the required libraries
from typing import Dict
from googletrans.models import Translated
from googletrans import Translator as GoogleTranslator

class TextTranslator:
    """
    A class for translating text from a source language to a target language.
    """
    def __init__(self) -> None:
        """
        Initializes the TextTranslator object with a GoogleTranslator instance.
        """
        self.translator = GoogleTranslator()

    async def translate(self, text: str, source_language: str = "auto", target_language: str = "eng") -> str:
        """
        Translates the given text.

        Args:
            text (str): The text to translate.
            source_language (str): The source language code (str, e.g., "eng", "tam", "auto"). Defaults to "auto" for automatic language detection.
            target_language (str): The target language code (str, e.g., "eng", "tam"). Defaults to "eng" (English).

        Returns:
            str: The translated text. Returns an empty string if the input text is empty.

        Raises:
            Exception: If a translation error occurs. Includes details about the error.
        """
        try:
            # Handle empty input text
            if not text:
                return ""
            
            # Convert language codes to googletrans format
            source_language = self._convert_language_code(source_language)
            target_language = self._convert_language_code(target_language)

            # Translate text from source language to target language
            result: Translated = await self.translator.translate(text, src=source_language, dest=target_language)

            # Return translated text
            return result.text

        except Exception as e:
            raise Exception(f"Translation error: {str(e)}")


    def _convert_language_code(self, code: str) -> str:
        """
        Converts common language codes (e.g., "eng", "hin") to the ISO 639-1 codes used by googletrans (e.g., "en", "hi").

        Args:
            code (str): The language code to convert.

        Returns:
            str: The converted ISO 639-1 language code. Returns the original code if no mapping is found.
        """
        # Convert to lowercase for consistent mapping
        code: str = code.lower()
        
        # Language mapping
        code_mapping: Dict[str, str] = {
            "ben": "bn",  # Bengali
            "eng": "en",  # English
            "guj": "gu",  # Gujarati
            "hin": "hi",  # Hindi
            "kan": "kn",  # Kannada
            "mal": "ml",  # Malayalam
            "mar": "mr",  # Marathi
            "ori": "or",  # Odia
            "pan": "pa",  # Punjabi
            "tam": "ta",  # Tamil
            "tel": "te",  # Telugu
            "urd": "ur",  # Urdu
            # Add more language mappings as needed
        }

        # Return mapped code or original if not found
        return code_mapping.get(code, code)    
    
# For testing text_translator.py
if __name__ == "__main__":
    import asyncio

    translator = TextTranslator()
    
    test_text = "Hello, how are you?"
    language_codes = ["ben", "eng", "guj", "hin", "kan", "mal", "mar", "ori", "pan", "tam", "tel", "urd"]
    
    async def test_translations():
        try:
            empty_translation = await translator.translate("", source_language="auto", target_language="eng")
            print(f"Translation of empty text: '{empty_translation}'")
        except Exception as e:
            print(f"Error translating empty text: {str(e)}")

        for lang in language_codes:
            try:
                translated_text = await translator.translate(test_text, source_language="auto", target_language=lang)
                print(f"Auto Translation to {lang}: {translated_text}")
            except Exception as e:
                print(f"Error translating to {lang}: {str(e)}")

        for lang in language_codes:
            try:
                translated_text = await translator.translate(test_text, source_language="eng", target_language=lang)
                print(f"Translation to {lang}: {translated_text}")
            except Exception as e:
                print(f"Error translating to {lang}: {str(e)}")
    
    asyncio.run(test_translations())