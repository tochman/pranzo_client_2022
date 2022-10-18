import JtockAuth from "j-tockauth";
import Axios from "axios";
import i18n from "../../i18n";
class CustomAuth extends JtockAuth {
  constructor(args) {
    super(args);
    Axios.defaults.headers.post['X-LOCALE'] = i18n.language === 'GB' ? 'en' : 'sv'
    debugger
  }

}

export const auth = new CustomAuth({
  host: import.meta.env.PROD
    ? "https://pranzo-api.fly.dev/"
    : "http://localhost:3001",
  debug: false,
  useRoles: false,
});

export const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  return { ...headers };
};
