import axios from "axios";

export const axiosUser = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function useAxiosUser() {
  return axiosUser;
}
