import cv2
import numpy as np
import pytesseract
import matplotlib.pyplot as plt

def preprocess_image(image_path):

    image = cv2.imread(image_path)

    #--------> Grayscale convertion

    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    cv2.imwrite('B_preprocessing/Processing_Output/grayscale.webp', grayscale_image)

    print(f"Grayscale image saved")



    #--------> Noise reduction

    gaussian_image = cv2.GaussianBlur(grayscale_image, (5, 5), 1.0)

    print(f"GaussianBlur image saved")

    cv2.imwrite('B_preprocessing/Processing_Output/gaussian_blurred_image.jpg', gaussian_image)



    #-------->adaptiveThreshold

    thresh_image = cv2.adaptiveThreshold(grayscale_image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY, 11, 2)

    cv2.imwrite('B_preprocessing/Processing_Output/adaptive_thresholded_image.png', thresh_image)

    print(f"adaptiveThreshold image saved")



    #-------->Erosion & Dilation
     
    kernel = np.ones((1, 1), np.uint8)

    erosion = cv2.erode(thresh_image, kernel, iterations=1)

    cv2.imwrite('B_preprocessing/Processing_Output/erosion_output.png', erosion)

    dilation = cv2.dilate(erosion, kernel, iterations=1)

    cv2.imwrite('B_preprocessing/Processing_Output/dilation_output.png', dilation)



    #-------->Segmentation

    word_contours, _ = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for i, cnt in enumerate(word_contours):
      x, y, w, h = cv2.boundingRect(cnt)
      word_image = thresh_image[y:y+h, x:x+w]
      cv2.imwrite(f"B_preprocessing/Processing_Output/Segmentation/word_{i}.png", word_image)



    #-------->Edge_detection

    edges = cv2.Canny(dilation, 50, 150)

    cv2.imwrite('B_preprocessing/Processing_Output/edge_detection.png', edges)




    output_file = "B_preprocessing/extracted_text.txt"

    with open(output_file, "w", encoding="utf-8") as file:
        for i in range(len(word_contours)):
            word_img = cv2.imread(f"B_preprocessing/Processing_Output/Segmentation/word_{i}.png")
            text = pytesseract.image_to_string(word_img, lang="eng")  
            text = text.strip()
            
            if text:  
                file.write(f"Word {i}: {text}\n")
                print(f"Word {i}: {text}")  

    print(f"Extracted text saved to {output_file}")





input_image = 'A_input/input_image_4.png' 

preprocess_image(input_image)







# unused parts

# -------->Noise Reduction

    # median_image = cv2.medianBlur(grayscale_image, 5)

    # print(f"medianBlur image saved")
    
    # cv2.imwrite('B_preprocessing/Processing_Output/median_filtered_image.jpg', median_image)

    # bilateral_image = cv2.bilateralFilter(grayscale_image, 9, 75, 75)

    # print(f"bilateralFilter image saved")
    
    # cv2.imwrite('B_preprocessing/Processing_Output/bilateral_filtered_image.jpg', bilateral_image)




#-------->Histogram Equalization
    
    # equalized_img = cv2.equalizeHist(dilation)

    # plt.figure(figsize=(10, 5))

    # plt.subplot(1, 2, 1)
    # plt.imshow(grayscale_image, cmap='gray')
    # plt.title('Original Image')
    # plt.axis('off')

    # plt.subplot(1, 2, 2)
    # plt.imshow(equalized_img, cmap='gray')
    # plt.title('Equalized Image')
    # plt.axis('off')

    # plt.show()




#-------->Segmentation

    # contours, _ = cv2.findContours(dilation, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # lines = []
    # for contour in contours:
    #     x, y, w, h = cv2.boundingRect(contour)
    #     if h > 20:  
    #         lines.append((x, y, w, h))
    
    # lines = sorted(lines, key=lambda x: x[1])

    # word_images = []
    # i=1
    # for line in lines:
        # x, y, w, h = line
        # line_image = image[y:y+h, x:x+w]
        # gray_line = cv2.cvtColor(line_image, cv2.COLOR_BGR2GRAY)
        # _, thresh_line = cv2.threshold(gray_line, 150, 255, cv2.THRESH_BINARY_INV)

        # word_contours, _ = cv2.findContours(thresh_line, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # for word_contour in word_contours:
        #     wx, wy, ww, wh = cv2.boundingRect(word_contour)
        #     if ww > 5: 
        #         word_image = line_image[wy:wy+wh, wx:wx+ww]
        #         cv2.imwrite(f'B_preprocessing/Processing_Output/Segmentation/word{i}.png', word_image)
        #         i=i+1
       




#-------->Deskewing

    # coords = np.column_stack(np.where(dilation > 0))

    # angle = cv2.minAreaRect(coords)[-1]

    # if angle < -45:
    #     angle = -(90 + angle)
    # else:
    #     angle = -angle

    # (h, w) = grayscale_image.shape

    # center = (w // 2, h // 2)

    # rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)

    # rotated_img = cv2.warpAffine(grayscale_image, rotation_matrix, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

    # cv2.imwrite('B_preprocessing/Processing_Output/deskewed.png', rotated_img) 