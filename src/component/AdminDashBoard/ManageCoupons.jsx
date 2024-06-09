// import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ManageCoupons() {
  const { register, handleSubmit, reset } = useForm();
  // const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  // let [isOpen, setIsOpen] = useState(false);
  // const closeModal = () => {
  //   setIsOpen(false);
  // };
  // POST COUPONS //
  const onSubmit = async (data) => {
    const cuponItem = {
      couponCode: data.couponCode,
      discountAmount: data.discountAmount,
      couponCodeDescription: data.couponCodeDescription,
      expiryDate: data.expiryDate,
    };
    console.log(cuponItem);
    const coupons = await axiosSecure.post("/coupons", cuponItem);
    console.log(coupons.data);
    if (coupons.data.insertedId) {
      // /show a aleart
      console.log("added");
      alert("Product added successfully!");
      reset();
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
      console.log(result.data);
      return result.data;
    },
  });
  // DELETE COUPON
  const handleDeleteCoupon = async (id) => {
    const result = await axiosSecure.delete(`/coupons/${id}`);
    console.log(result);
    if (result.data.deletedCount) {
      alert("Delete successfully!");
      refetch();
    }
  };

  console.log(coupons);
  return (
    <div>
      <h2 className="text-3xl">ManageCoupons</h2>
      <div className="flex w-full items-start justify-between gap-10">
        <div className="w-1/2">
          <form
            className=" mt-8 flex flex-col gap-3 w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full justify-between gap-4">
              <input
                className="bg-white w-1/2 text-black h-12 px-3"
                type="number"
                placeholder="Coupon Code"
                {...register("couponCode", { required: true })}
              />
              <input
                className="bg-white w-1/2 text-black h-12 px-3"
                type="number"
                placeholder="Discount Ammount"
                {...register("discountAmount", { required: true })}
              />
            </div>
            <textarea
              className="bg-white text-black h-28 px-3 resize-none"
              placeholder="Coupon Code Discripton"
              {...register("couponCodeDescription", { required: true })}
            />
            <input
              type="date"
              {...register("expiryDate", { required: true })}
            />
            <input className="bg-blue-400 text-gray-600 p-3" type="submit" />
          </form>
        </div>
        <div className="flex w-1/2 flex-col gap-8 items-center justify-center">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="border border-red-700 p-5">
              <h2>Coupon Code: {coupon.couponCode}</h2>
              <h2 className="text-2xl">
                Discount Ammount if you use this coupon ${coupon.discountAmount}
              </h2>
              <p>Discription: {coupon.couponCodeDescription}</p>
              <h1 className="text-xl">Expiry Date: {coupon.expiryDate}</h1>
              <div className="flex justify-between">
                <button
                  // onClick={() => setIsOpen(true)}
                  className="btn btn-sm bg-blue-400 text-white"
                >
                  Edit
                </button>

                <div>
                  <button
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    className="btn btn-sm bg-red-400 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
