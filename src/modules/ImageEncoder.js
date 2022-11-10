import { inRange } from "lodash";
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
    const reader = new FileReader();
    reader.onload = async () => {
      const dimensions = await getHeightAndWidthFromDataUrl(reader.result);
      if (
        inRange(dimensions.width, 1100, 1300) &&
        inRange(dimensions.height, 300, 575)
      ) {
        resolve(reader.result);
      } else
        reject(
          "Please check your image size."
        );
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
