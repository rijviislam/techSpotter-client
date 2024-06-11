import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditCoupon() {
  const { data } = useLoaderData();
  const navigate = useNavigate();
  const { _id, couponCode, couponCodeDescription, discountAmount, expiryDate } =
    data;
  console.log(data);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const updateItem = {
        couponCode: data.couponCode,
        discountAmount: data.discountAmount,
        expiryDate: data.expiryDate,
        couponCodeDescription: data.couponCodeDescription,
      };
      const updatedResult = await axiosSecure.patch(
        `https://techspotter-a12-server.vercel.app/coupon/${_id}`,
        updateItem
      );
      console.log(updatedResult);
      if (updatedResult.data.modifiedCount > 0) {
        Swal.fire({
          title: "Coupon Updated successfully!",
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
        navigate("/dashboard/admin-dashboard/manage-coupons");
      }
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl my-10 text-teal-600 font-bold">Edit Coupon</h2>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex bg-cyan-400 p-10 flex-col gap-4 rounded-lg w-[350px] md:w-[768px] lg:w-full"
        >
          <div className="flex flex-col w-full gap-4">
            <input
              defaultValue={couponCode}
              className="bg-gray-100  h-12 px-5 rounded-lg"
              {...register("couponCode", { required: true })}
            />
            <input
              type="number"
              defaultValue={discountAmount}
              className="bg-gray-100  h-12 px-5 rounded-lg"
              {...register("discountAmount", { required: true })}
            />
            <input
              type="date"
              defaultValue={expiryDate}
              className="bg-gray-100  h-12 px-5 rounded-lg"
              {...register("expiryDate", { required: true })}
            />
          </div>

          <textarea
            defaultValue={couponCodeDescription}
            className="bg-gray-100 h-[200px] p-3 resize-none rounded-lg"
            {...register("couponCodeDescription", { required: true })}
          />

          <input
            className="bg-blue-500 p-3 cursor-pointer text-white font-semibold rounded-xl w-[100px]"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
