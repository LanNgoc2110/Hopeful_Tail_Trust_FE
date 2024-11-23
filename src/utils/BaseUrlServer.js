import axios from "axios";

export const Api = () => {
  return axios.create({
    baseURL: "https://backend-exe-2.vercel.app/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
};