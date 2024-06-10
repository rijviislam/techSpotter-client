export default function EditCoupon() {
  //   const { register, handleSubmit, reset, refatch } = useForm();
  //   const axiosSecure = useAxiosSecure();

  //   const onSubmit = async (data) => {
  //     const cuponItem = {
  //       couponCode: data.couponCode,
  //       discountAmount: data.discountAmount,
  //       couponCodeDescription: data.couponCodeDescription,
  //       expiryDate: data.expiryDate,
  //     };
  //     console.log(cuponItem);
  //     const coupons = await axiosSecure.post("/coupons", cuponItem);
  //     console.log(coupons.data);
  //     if (coupons.data.insertedId) {
  //       Swal.fire({
  //         title: "Coupon Added!",
  //         showClass: {
  //           popup: `
  //             animate__animated
  //             animate__fadeInUp
  //             animate__faster
  //           `,
  //         },
  //         hideClass: {
  //           popup: `
  //             animate__animated
  //             animate__fadeOutDown
  //             animate__faster
  //           `,
  //         },
  //       });
  //       reset();
  //       refatch();
  //       // navigate("/dashboard/my-product");
  //     }
  //   };
  //   // GET COUPONS //
  //   const {
  //     data: coupons = [],
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useQuery({
  //     queryKey: ["coupons"],
  //     queryFn: async () => {
  //       const result = await axiosSecure.get("/coupons");
  //       console.log(result.data);
  //       return result.data;
  //     },
  //   });
  //   console.log(coupons);
  return (
    // <div>
    //   <form
    //     className=" mt-8 flex flex-col gap-3 lg:w-[500px] w-[360px]"
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
    //     <div className="flex lg:flex-row md:flex-row flex-col w-full justify-between gap-4">
    //       <input
    //         className="bg-white lg:w-1/2  text-black h-12 px-3 rounded-lg"
    //         type="number"
    //         placeholder="Coupon Code"
    //         {...register("couponCode", { required: true })}
    //       />
    //       <input
    //         className="bg-white w-1/2 text-black h-12 px-3 rounded-lg"
    //         type="number"
    //         placeholder="Discount Ammount"
    //         {...register("discountAmount", { required: true })}
    //       />
    //     </div>
    //     <textarea
    //       className="bg-white text-black h-28 px-3 resize-none rounded-lg"
    //       placeholder="Coupon Code Discripton"
    //       {...register("couponCodeDescription", { required: true })}
    //     />
    //     <input
    //       className="mt-1 block w-full px-3 py-2 bg-teal-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
    //       type="date"
    //       {...register("expiryDate", { required: true })}
    //     />
    //     <input
    //       className="bg-blue-400 text-gray-600 p-3 rounded-lg"
    //       type="submit"
    //     />
    //   </form>
    // </div>
    <h2 className="text-3xl">Hiiiiiiii</h2>
  );
}
