import { Outlet } from "react-router-dom";
import UserDashBoardSidebar from "../component/UserDashBoard/UserDashBoardSidebar";

export default function UserDashboardLayout() {
  return (
    <div className="flex justify-around">
      <UserDashBoardSidebar />
      <div className="w-3/4 border-2 border-red-600">
        <Outlet />
      </div>
    </div>
  );
}
