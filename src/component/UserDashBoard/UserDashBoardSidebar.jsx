import { CgAdd, CgProfile } from "react-icons/cg";
import { GrLogout } from "react-icons/gr";
import { MdYard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

export default function UserDashBoardSidebar() {
  const { user, logOutUser } = useAuth();
  const [userInfo] = useUser();
  console.log(userInfo.role);
  const normalUser = userInfo.role === "normalUser";
  const moderator = userInfo.role === "moderator";
  console.log(normalUser, moderator);
  return (
    <div className="mr-10">
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform `}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
              {user ? (
                <Link
                  to="/"
                  className="hidden md:block w-full h-full lg:flex justify-between items-center"
                >
                  <img
                    className="border-2 border-green-600 rounded-full w-[50px] h-[50px]"
                    referrerPolicy="no-referrer"
                    src={user && user.photoURL ? user.photoURL : "?"}
                    alt="profile"
                    height="30"
                    width="30"
                  />
                  <p>{user.displayName}</p>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6">
          {normalUser ? (
            <nav>
              <NavLink
                to="/user-dashboard"
                end
                className="flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 border border-green-600"
              >
                <CgProfile className="w-5 h-5" />

                <span className="mx-4 font-medium">My Profile</span>
              </NavLink>
              <NavLink
                to="/user-dashboard/add-product"
                end
                className="flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 border border-green-600"
              >
                <CgAdd className="w-5 h-5" />

                <span className="mx-4 font-medium">Add Product</span>
              </NavLink>
              <NavLink
                to="/user-dashboard/my-product"
                end
                className="flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 border border-green-600"
              >
                <MdYard className="w-5 h-5" />

                <span className="mx-4 font-medium">My Product</span>
              </NavLink>
            </nav>
          ) : (
            " "
          )}
          {moderator ? (
            <nav>
              <NavLink
                to="/moderator-dashboard/product-review-queue"
                end
                className="flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 border border-green-600"
              >
                <CgProfile className="w-5 h-5" />

                <span className="mx-4 font-medium">Product Review Queue</span>
              </NavLink>
              <NavLink
                to="/moderator-dashboard/reported-contents"
                end
                className="flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 border border-green-600"
              >
                <CgProfile className="w-5 h-5" />

                <span className="mx-4 font-medium">Reported Contents</span>
              </NavLink>
            </nav>
          ) : (
            " "
          )}
        </div>

        <div>
          <hr />

          <button
            onClick={logOutUser}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
