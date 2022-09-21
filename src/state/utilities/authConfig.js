import JtockAuth from "j-tockauth";

export const auth = new JtockAuth({
  host: import.meta.env.PROD
    ? "https://bocado-server.herokuapp.com/"
    : "http://localhost:3001",
  debug: false,
});

export const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  return { ...headers };
};
