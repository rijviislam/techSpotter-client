import axios from "axios";

export const useAxiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
