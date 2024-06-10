import axios from "axios";

const axiosUser = axios.create({
  baseURL: "https://techspotter-a12-server.vercel.app",
});
export default function useAxiosUser() {
  return axiosUser;
}
