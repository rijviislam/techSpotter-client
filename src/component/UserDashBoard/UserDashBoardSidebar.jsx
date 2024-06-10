import { useEffect, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { CgAdd, CgProfile } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import { MdReport, MdReviews, MdYard } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

export default function UserDashBoardSidebar() {
  const { user, logOutUser } = useAuth();
  const [userInfo] = useUser();
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const normalUser = userInfo.role === "normalUser";
  const moderator = userInfo.role === "moderator";
  const admin = userInfo.role === "admin";

  useEffect(() => {
    if (normalUser) {
      navigate("/dashboard/my-profile");
    } else if (moderator) {
      navigate("/dashboard/moderator-dashboard");
    } else if (admin) {
      navigate("/dashboard/admin-dashboard");
    }
  }, [normalUser, moderator, admin, navigate]);
  const handleToggle = () => {
    setActive(!isActive);
    console.log("rijvi");
  };
  return (
    <div className="mr-10 relative">
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:w-[768px] w-[360px] lg:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className="text-3xl  text-teal-600 font-bold">
              TechSpotter
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`z-10 md:fixed lg:flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform  h-screen ${
          isActive && "-translate-x-full flex"
        }`}
      >
        <Link to="/">
          <div className="text-3xl  text-teal-600 font-bold">TechSpotter</div>
        </Link>
        <div className="lg:flex flex-col justify-between absolute top-16">
          {normalUser && (
            <nav>
              <NavLink
                to="/dashboard/my-profile"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg  ${
                    isActive ? "bg-gray-300 text-white" : ""
                  }`
                }
              >
                <CgProfile className="w-5 h-5" />
                <span className="mx-4 font-medium text-white">My Profile</span>
              </NavLink>
              <NavLink
                to="/dashboard/add-product"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-white" : ""
                  }`
                }
              >
                <CgAdd className="w-5 h-5 text-white" />
                <span className="mx-4 font-medium text-white">Add Product</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-product"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-white" : ""
                  }`
                }
              >
                <MdYard className="w-5 h-5 text-white" />
                <span className="mx-4 font-medium text-white">My Product</span>
              </NavLink>
            </nav>
          )}
          {moderator && (
            <nav>
              <NavLink
                to="/dashboard/moderator-dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-white" : ""
                  }`
                }
              >
                <MdReviews className="w-5 h-5 text-white" />
                <span className="mx-4 font-medium text-white">
                  Product Review
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/moderator-dashboard/reported-contents"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-gray-700" : ""
                  }`
                }
              >
                <MdReport className="w-5 h-5  text-white" />
                <span className="mx-4 font-medium  text-white">
                  Reported Contents
                </span>
              </NavLink>
            </nav>
          )}
          {admin && (
            <nav>
              <NavLink
                to="/dashboard/admin-dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-gray-700" : ""
                  }`
                }
              >
                <MdReviews className="w-5 h-5  text-white" />
                <span className="mx-4 font-medium  text-white">Statistics</span>
              </NavLink>
              <NavLink
                to="/dashboard/admin-dashboard/manage-users"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-gray-700" : ""
                  }`
                }
              >
                <MdReport className="w-5 h-5" />
                <span className="mx-4 font-medium  text-white">
                  Manage Users
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/admin-dashboard/manage-coupons"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors bg-teal-600 duration-300 transform hover:bg-teal-300 hover:text-gray-700 rounded-lg ${
                    isActive ? "bg-gray-300 text-gray-700" : ""
                  }`
                }
              >
                <MdReport className="w-5 h-5 text-white" />
                <span className="mx-4 font-medium  text-white">
                  Manage Coupons
                </span>
              </NavLink>
            </nav>
          )}
          <hr />
          <button
            onClick={logOutUser}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform absolute -bottom-[200px] bg-red-500 rounded-lg"
          >
            <GrLogout className="w-5 h-5 text-white" />
            <span className="mx-4 font-medium text-white">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
