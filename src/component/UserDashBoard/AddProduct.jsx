import axios from "axios";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function AddProduct() {
  const { user } = useAuth();
  const axiosUser = useAxiosUser();
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const result = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const postedTime = new Date();
    console.log(result.data);
    if (result.data.success) {
      const productItem = {
        productName: data.productName,
        postedTime,
        email: data.ownerEmail,
        links: data.links,
        description: data.description,
        recipe: data.recipe,
        ownerName: data.ownerName,
        ownerImage: user?.photoURL,
        productImage: result.data.data.display_url,
      };
      const productResult = await axiosUser.post("/product", productItem);
      console.log(productResult.data);
      if (productResult.data.insertedId) {
        // /show a aleart
        console.log("added");
        alert("Product added successfully!");
        reset();
      }
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex bg-cyan-400 p-10 flex-col gap-4"
      >
        {/* <input
          type="text"
          className="hidden"
          defaultValue={Date.now()}
          {...register("timestamp", { required: true })}
        /> */}
        <div className="flex w-full gap-4">
          <input
            placeholder="Product Name"
            className="bg-gray-100 w-1/2 h-12 px-5"
            {...register("productName", { required: true })}
          />
          <input
            type="file"
            className="file-input w-1/2 max-w-xs"
            {...register("image", { required: true })}
          />
        </div>

        <div className="flex w-full gap-4">
          <input
            // placeholder="Owner Email"
            readOnly
            defaultValue={user?.email}
            className="bg-gray-100 w-1/2 h-12 px-5"
            type="email"
            {...register("ownerEmail", { required: true })}
          />
          <input
            placeholder="Links"
            className="bg-gray-100 w-1/2 h-12 px-5"
            {...register("links", { required: true })}
          />
        </div>
        <textarea
          placeholder="Description"
          className="bg-gray-100 h-[200px] p-3 resize-none"
          {...register("description", { required: true })}
        />
        <div className="flex w-full gap-4">
          <input
            className="bg-gray-100 w-1/2 h-12 px-5"
            type="text"
            readOnly
            defaultValue={user?.displayName}
            {...register("ownerName", { required: true })}
          />

          <img
            src={user?.photoURL}
            className="w-14 h-14 rounded-full p-1 border-2 border-blue-700"
            alt=""
            {...register("ownerImage")}
          />
        </div>

        <input
          className="bg-blue-500 p-3 cursor-pointer text-white font-semibold rounded-xl w-[100px]"
          type="submit"
        />
      </form>
    </div>
  );
}
