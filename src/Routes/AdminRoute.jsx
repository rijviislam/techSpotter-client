import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUser from "../hooks/useUser";

export default function AdminRoute({ children }) {
  const { user, loader } = useContext(AuthContext);
  const [userInfo] = useUser();
  const location = useLocation();
  const admin = userInfo.role === "admin";
  if (loader) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && admin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}
