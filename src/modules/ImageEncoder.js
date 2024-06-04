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
      const reader = new FileReader();
      reader.onload = async () => {
        const dimensions = await getHeightAndWidthFromDataUrl(reader.result);
        const aspectRatio = dimensions.width / dimensions.height;
        if (
          inRange(dimensions.width, 1100, 4000) &&
          inRange(dimensions.height, 300, 1600) &&
          inRange(aspectRatio, 2.5, 3.5)
        ) {
          resolve(reader.result);
        } else {
          reject(i18n.t('venue.formElements.logoErrorInstruction'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  