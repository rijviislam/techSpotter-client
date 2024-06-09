import { Outlet } from "react-router-dom";
import UserDashBoardSidebar from "../component/UserDashBoard/UserDashBoardSidebar";

export default function ModeratorDashboardLayout() {
  return (
    <div className="flex justify-around flex-col lg:flex-row">
      <UserDashBoardSidebar />
      <div className="w-3/4">
        <Outlet />
      </div>
    </div>
  );
}
