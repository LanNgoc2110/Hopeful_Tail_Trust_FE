import axios from "axios";

export const Api = () => {
  return axios.create({
    baseURL: "https://backend-exe-2.vercel.app",
  });
};