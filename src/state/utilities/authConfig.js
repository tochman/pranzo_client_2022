import DeviseTokenAuth from "../../modules/DeviseTokenAuth";


export const auth = new DeviseTokenAuth({
  host: import.meta.env.PROD
    ? "https://pranzo-api.fly.dev/"
    : "http://localhost:3001",
  debug: true,
  useRoles: false,
});

export const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem("auth-storage"));
  return { ...headers };
};
