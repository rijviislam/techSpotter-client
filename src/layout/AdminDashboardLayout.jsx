import { Outlet } from "react-router-dom";
import UserDashBoardSidebar from "../component/UserDashBoard/UserDashBoardSidebar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex justify-around border border-red-600">
      <UserDashBoardSidebar />
      <div className="w-3/4">
        <Outlet />
      </div>
    </div>
  );
}
