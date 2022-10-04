import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SE } from "./locales/SE";
import { GB } from "./locales/GB";

i18n.use(initReactI18next).init({
  resources: {
    GB: GB,
    SE: SE,
  },
  lng: import.meta.env.PROD ? "SE" : "GB",
  fallbackLng: import.meta.env.PROD ? "SE" : "GB",
  react: {
    useSuspense: true,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
