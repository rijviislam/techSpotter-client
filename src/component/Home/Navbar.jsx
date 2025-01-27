import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navbar = (
    <>
      <li>
        <Link>Home</Link>
      </li>

      <li>
        <Link to="/products">Product</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#224955] z-50 px-10 py-3 fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 w-52"
          >
            {navbar}
          </ul>
        </div>
        <Link to="/" className="text-xl text-white font-semibold ">
          TechSpotter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">{navbar}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className=" w-[50px] h-[50px] cursor-pointer"
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user && user.photoURL ? user.photoURL : "?"} />
                    </div>
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md lg:w-[10vw] md:w-[15vw] sm:w-[15vh] bg-white overflow-hidden right-0 top-12 text-sm z-50">
                  <div className="flex flex-col cursor-pointer ">
                    {user ? (
                      <>
                        <p className="text-sm px-4 py-1 text-teal-500 font-medium select-none">
                          {user.displayName}
                        </p>
                        <Link
                          to="dashboard"
                          className="block  px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>

                        <div
                          onClick={logOutUser}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-bold cursor-pointer text-red-500 "
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-teal-400 transition font-semibold bg-teal-600"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-teal-400 transition font-semibold bg-teal-600"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-1 lg:gap-3">
            <Link to="/login">
              <button className="btn btn-sm text-white  btn-primary bg-teal-600 border-none">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm text-white bg-teal-600 btn-primary border-none">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
