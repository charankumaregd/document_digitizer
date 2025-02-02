# Import the required libraries
import os
import cv2
from typing import Optional

class ImagePreprocessor:
    """
    A class for preprocessing images.
    """
    def __init__(self, temp_folder: str) -> None:
        """
        Initializes the ImagePreprocessor.

        Args:
            temp_folder (str): The path to the temporary folder where the preprocessed image will be saved.
        """
        self.preprocessed_image_path: str = os.path.join(temp_folder, "preprocessed.png")

    def process(self, image_path: str) -> str:
        """
        Processes the image by simply saving a copy to the specified location.
        More complex preprocessing steps could be added here (e.g., resizing, color correction, etc.).

        Args:
            image_path (str): The path to the input image.

        Returns:
            str: The path to the preprocessed image.

        Raises:
            ValueError: If the image at image_path cannot be read.
        """
        # Read the image
        image: Optional[cv2.Mat] = cv2.imread(image_path)

        # Handle potential read errors.
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")
        
        # TODO: Preprocessing logic

        # Write the preprocessed image
        cv2.imwrite(self.preprocessed_image_path, image)

        # Returns the preprocessed image path
        return self.preprocessed_image_path
    
# For testing image_preprocessor.py
if __name__ == "__main__":
    print("Hello from image_preprocessor.py")