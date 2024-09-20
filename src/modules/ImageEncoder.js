import { inRange } from "lodash";
import i18n from "../i18n";
export const getHeightAndWidthFromDataUrl = (dataURL) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  });

  export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const t = i18n.t
      const maxFileSize = 2 * 1024 * 1024; // 2 MB
  
      // Check file size
      if (file.size > maxFileSize) {
        reject(t('venue.formElements.fileSizeExceedsLimit') || 'File size exceeds the maximum limit of 2 MB.');
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        const dataURL = reader.result;
        const img = new Image();
  
        img.onload = () => {
          const { width, height } = img;
  
          // Accept images that are square or portrait
          if (width <= height) {
            resolve(dataURL); // Return Base64 string
          } else {
            reject(t('venue.formElements.imageNotSquareOrPortrait') || 'The image must be square or in portrait orientation.');
          }
        };
  
        img.onerror = () => {
          reject(t('venue.formElements.imageLoadError') || 'Failed to load image. The file may be corrupted or not a valid image.');
        };
  
        img.src = dataURL;
      };
  
      reader.onerror = () => {
        reject(t('venue.formElements.fileReadError') || 'Failed to read the file.');
      };
  
      reader.readAsDataURL(file);
    });
  
