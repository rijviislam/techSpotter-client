import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

export default function useAxiosSecure() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // REQUEST INTERCEPTOR  TO ADD AUTHORIZATION HEADER FOR EVERY SECURE CALL TO THE API//
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("Token");
      config.headers.authorization = `Barare ${token}`;

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
