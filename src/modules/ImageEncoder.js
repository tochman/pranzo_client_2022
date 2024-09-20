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
    const maxFileSize = 5 * 1024 * 1024; // Allow up to 5MB
    const maxImageWidth = 3000; // Maximum width for logos
    const maxImageHeight = 2000; // Maximum height for logos

    if (file.size > maxFileSize) {
      reject(
        i18n.t("venue.formElements.fileSizeExceedsLimit") ||
          "File size exceeds the maximum limit of 5 MB."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      const img = new Image();

      img.onload = () => {
        const { width, height } = img;
        if (width <= maxImageWidth && height <= maxImageHeight) {
          resolve(dataURL);
        } else {
          reject(
            i18n.t("venue.formElements.imageDimensionsTooLarge") ||
              `Image dimensions are too large. Maximum allowed size is ${maxImageWidth}x${maxImageHeight} pixels.`
          );
        }
      };

      img.onerror = () =>
        reject(
          i18n.t("venue.formElements.imageLoadError") ||
            "Failed to load image. The file may be corrupted or not a valid image."
        );
      img.src = dataURL;
    };

    reader.onerror = () =>
      reject(
        i18n.t("venue.formElements.fileReadError") || "Failed to read the file."
      );
    reader.readAsDataURL(file);
  });
