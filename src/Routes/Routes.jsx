import { createBrowserRouter } from "react-router-dom";
import FeaturedProducts from "../component/Home/FeaturedProducts/FeaturedProducts";
import Home from "../component/Home/Home";
import TrendingProducts from "../component/Home/TrendingProducts/TrendingProducts";
import Product from "../component/Product/Product";
import AddProduct from "../component/UserDashBoard/AddProduct";
import MyProducts from "../component/UserDashBoard/MyProducts";
import MyProfile from "../component/UserDashBoard/MyProfile";
import UpdateProduct from "../component/UserDashBoard/UpdateProduct";
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
        element: <Home />,
      },
      {
        path: "/feature-products",
        element: <FeaturedProducts />,
      },
      {
        path: "/trending-produsts",
        element: <TrendingProducts />,
      },
      {
        path: "/produsts",
        element: <Product />,
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
    path: "/dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/my-product",
        element: <MyProducts />,
      },
      {
        path: "/dashboard/update-produst/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
      },
    ],
  },
]);
