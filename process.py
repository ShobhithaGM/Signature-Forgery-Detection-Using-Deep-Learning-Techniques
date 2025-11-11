import cv2
import numpy as np

def preprocess_image1(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (220, 155))
    img = cv2.GaussianBlur(img, (3, 3), 0)
    img = img / 255.0
    img = np.reshape(img, (1, 220, 155, 1))
    return img

def preprocess_image(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (155, 220))   # match training dimensions (width=155, height=220)
    img = img / 255.0
    img = np.reshape(img, (1, 220, 155, 1))
    return img