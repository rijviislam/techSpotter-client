import { createBrowserRouter } from "react-router-dom";
import ManageCoupons from "../component/AdminDashBoard/ManageCoupons";
import ManageUsers from "../component/AdminDashBoard/ManageUsers";
import Statistics from "../component/AdminDashBoard/Statistics";
import CouponSlider from "../component/Home/CouponSlider";
import Error from "../component/Home/Error";
import FeaturedProducts from "../component/Home/FeaturedProducts/FeaturedProducts";
import Hero from "../component/Home/Hero";
import Home from "../component/Home/Home";
import ProductDetails from "../component/Home/ProductDetails";
import TrendingProducts from "../component/Home/TrendingProducts/TrendingProducts";
import ProductReview from "../component/ModeratorDashBoard/ProductReview";
import ReportedContents from "../component/ModeratorDashBoard/ReportedContents";
import Payment from "../component/Payment/Payment";
import Product from "../component/Product/Product";
import AddProduct from "../component/UserDashBoard/AddProduct";
import MyProducts from "../component/UserDashBoard/MyProducts";
import MyProfile from "../component/UserDashBoard/MyProfile";
import UpdateProduct from "../component/UserDashBoard/UpdateProduct";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import MainLayout from "../layout/MainLayout";
import ModeratorDashboardLayout from "../layout/ModeratorDashboardLayout";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hero",
        element: <Hero />,
      },
      {
        path: "/feature-products",
        element: <FeaturedProducts />,
      },
      {
        path: "/trending-products",
        element: <TrendingProducts />,
      },
      {
        path: "/coupon-slider",
        element: <CouponSlider />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
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
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-product",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update-produst/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/moderator-dashboard",
    element: (
      <ModeratorRoute>
        <ModeratorDashboardLayout />
      </ModeratorRoute>
    ),
    children: [
      {
        path: "/dashboard/moderator-dashboard",
        element: (
          <ModeratorRoute>
            <ProductReview />
          </ModeratorRoute>
        ),
      },
      {
        path: "/dashboard/moderator-dashboard/reported-contents",
        element: (
          <ModeratorRoute>
            <ReportedContents />
          </ModeratorRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/admin-dashboard",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard/admin-dashboard",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin-dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin-dashboard/manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
    ],
  },
]);
