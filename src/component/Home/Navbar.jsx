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
        <Link to="/produsts">Product</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbar}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          TechSpotter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbar}</ul>
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
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user ? (
                      <>
                        <p className="text-sm px-8 py-1 text-green-500 font-medium select-none">
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
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
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
              <button className="btn btn-sm text-white  btn-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="btn btn-sm text-white  btn-primary">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
