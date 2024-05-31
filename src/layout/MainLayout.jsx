import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../component/Home/Navbar";

export default function MainLayout() {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <Outlet />
      {/* {noHeaderFooter || <Footer />} */}
    </div>
  );
}
