import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function UpdateProduct() {
  const { _id, productName, links, description } = useLoaderData();
  const { user } = useAuth();
  const axiosUser = useAxiosUser();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const result = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const postedTime = new Date();
    const status = "pending";
    let voteCount = 0;
    if (result.data.success) {
      const productItem = {
        productName: data.productName,
        postedTime,
        voteCount,
        status,
        email: data.ownerEmail,
        links: data.links,
        description: data.description,
        productImage: result.data.data.display_url,
      };
      const productResult = await axiosUser.patch(
        `/product/${_id}`,
        productItem
      );
      console.log(productResult.data);
      if (productResult.data.modifiedCount > 0) {
        Swal.fire({
          title: "Product Updated successfully!",
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
        navigate("/dashboard/my-product");
      }
    }
  };
  return (
    <div>
      <h2 className="text-3xl  text-teal-600 font-bold">Update Product</h2>
      <div>
        <div className="flex items-center justify-center w-full min-h-screen md:ml-24">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex bg-cyan-400 p-10 flex-col gap-4 rounded-lg"
          >
            <div className="flex w-full gap-4">
              <input
                placeholder="Product Name"
                defaultValue={productName}
                className="bg-gray-100 w-1/2 h-12 px-5 rounded-lg"
                {...register("productName", { required: true })}
              />
              <input
                type="file"
                className="file-input w-1/2 max-w-xs rounded-lg"
                {...register("image", { required: true })}
              />
            </div>

            <div className="flex w-full gap-4">
              <input
                readOnly
                defaultValue={user?.email}
                className="bg-gray-100 w-1/2 h-12 px-5 rounded-lg"
                type="email"
                {...register("ownerEmail", { required: true })}
              />
              <input
                placeholder="Links"
                defaultValue={links}
                className="bg-gray-100 w-1/2 h-12 px-5 rounded-lg"
                {...register("links", { required: true })}
              />
            </div>
            <textarea
              placeholder="Description"
              defaultValue={description}
              className="bg-gray-100 h-[200px] p-3 resize-none rounded-lg"
              {...register("description", { required: true })}
            />

            <input
              className="bg-blue-500 p-3 cursor-pointer text-white font-semibold rounded-xl w-[100px]"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
