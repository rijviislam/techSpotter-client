import { createBrowserRouter } from "react-router-dom";
import FeaturedProducts from "../component/Home/FeaturedProducts/FeaturedProducts";
import Home from "../component/Home/Home";
import ProductReviewQueue from "../component/Home/ModeratorDashBoard/ProductReviewQueue";
import ReportedContents from "../component/Home/ModeratorDashBoard/ReportedContents";
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
      {
        path: "/user-dashboard/update-produst/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
      },
    ],
  },
  {
    path: "moderator-dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        path: "/moderator-dashboard/product-review-queue",
        element: <ProductReviewQueue />,
      },
      {
        path: "/moderator-dashboard/reported-contents",
        element: <ReportedContents />,
      },
    ],
  },
]);
