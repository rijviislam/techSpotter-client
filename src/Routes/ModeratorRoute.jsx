import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useUser from "../hooks/useUser";

export default function ModeratorRoute({ children }) {
  const { user, loader } = useContext(AuthContext);
  const [userInfo] = useUser();
  const location = useLocation();
  const moderator = userInfo.role === "moderator";
  if (loader) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && moderator) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
}
