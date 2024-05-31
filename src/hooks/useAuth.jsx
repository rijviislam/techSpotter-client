import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthContext";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
