import axios from "axios";

const axiosUser = axios.create({
  baseURL: "http://localhost:5000",
});
export default function useAxiosUser() {
  return axiosUser;
}
