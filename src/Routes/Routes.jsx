import { createBrowserRouter } from "react-router-dom";
import FeaturedProducts from "../component/Home/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../component/Home/TrendingProducts/TrendingProducts";
import AddProduct from "../component/UserDashBoard/AddProduct";
import MyProducts from "../component/UserDashBoard/MyProducts";
import MyProfile from "../component/UserDashBoard/MyProfile";
import MainLayout from "../layout/MainLayout";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <FeaturedProducts />,
      },
      {
        path: "/",
        element: <TrendingProducts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/user-dashboard",
        element: <MyProfile />,
      },
      {
        path: "/user-dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/user-dashboard/my-product",
        element: <MyProducts />,
      },
    ],
  },
]);
