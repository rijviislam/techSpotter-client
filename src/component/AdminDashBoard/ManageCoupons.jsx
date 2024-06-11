import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ManageCoupons() {
  const { register, handleSubmit, reset, refatch } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const cuponItem = {
      couponCode: data.couponCode,
      discountAmount: data.discountAmount,
      couponCodeDescription: data.couponCodeDescription,
      expiryDate: data.expiryDate,
    };
    const coupons = await axiosSecure.post("/coupons", cuponItem);
    if (coupons.data.insertedId) {
      Swal.fire({
        title: "Coupon Added!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      reset();
      refatch();
      // navigate("/dashboard/my-product");
    }
  };
  // GET COUPONS //
  const {
    data: coupons = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const result = await axiosSecure.get("/coupons");
      return result.data;
    },
  });
  // DELETE COUPON
  const handleDeleteCoupon = async (id) => {
    const result = await axiosSecure.delete(`/coupons/${id}`);
    if (result.data.deletedCount) {
      Swal.fire({
        title: "Coupon Deleted!",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      refetch();
    }
  };
  const expiryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <p>Error...</p>;
  return (
    <div className="lg:w-full w-[360px] md:w-[768px]">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">ManageCoupons</h2>
      <div className="flex lg:flex-row md:flex-row flex-col w-full items-start justify-between gap-10">
        <div className="w-1/2">
          <form
            className=" mt-8 flex flex-col gap-3 lg:w-[500px] w-[360px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex lg:flex-row md:flex-row flex-col w-full justify-between gap-4">
              <input
                className="bg-white lg:w-1/2  text-black h-12 px-3 rounded-lg"
                type="number"
                placeholder="Coupon Code"
                {...register("couponCode", { required: true })}
              />
              <input
                className="bg-white w-1/2 text-black h-12 px-3 rounded-lg"
                type="number"
                placeholder="Discount Ammount"
                {...register("discountAmount", { required: true })}
              />
            </div>
            <textarea
              className="bg-white text-black h-28 px-3 resize-none rounded-lg"
              placeholder="Coupon Code Discripton"
              {...register("couponCodeDescription", { required: true })}
            />
            <input
              className="mt-1 block w-full px-3 py-2 bg-teal-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
              type="date"
              {...register("expiryDate", { required: true })}
            />
            <input
              className="bg-blue-400 text-gray-600 p-3 rounded-lg"
              type="submit"
            />
          </form>
        </div>
        <div className="flex w-1/2 flex-col gap-8 items-center justify-center">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="ticket w-[360px] md:w-[350px] px-3 rounded-lg"
            >
              <div className="datas ">
                <div className="ribbon">
                  <div className="label text-sm">Code: {coupon.couponCode}</div>
                </div>
                <span className="text-black font-semibold text-xl mt-10">
                  Discount Amount:
                  {coupon.discountAmount}
                </span>
                <p className="text-xl text-black mt-5">
                  {coupon.couponCodeDescription}
                </p>
              </div>
              <p className="text-teal-950 text-3xl font-medium mb-5">
                {expiryDate(coupon.expiryDate)}
              </p>
              <div className="flex items-center justify-around">
                <Link
                  to={`/dashboard/admin-dashboard/update-coupon/${coupon._id}`}
                >
                  <button className="btn btn-sm bg-blue-400 text-white">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="btn btn-sm bg-red-400 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
