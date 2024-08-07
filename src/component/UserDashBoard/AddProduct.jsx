import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import "../../../style.css";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosUser from "../../hooks/useAxiosUser";
import "../../tag.css";

export default function AddProduct() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosUser = useAxiosUser();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(["AI"]);

  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const result = await axiosUser.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const postedTime = new Date();
    const status = "pending";
    let voteCount = 0;
    const reported = "false";
    const tags = selected;
    const isFeatured = "false";
    const votedEmail = [];

    if (result.data.success) {
      const productItem = {
        productName: data.productName,
        postedTime,
        voteCount,
        status,
        reported,
        tags,
        isFeatured,
        votedEmail,
        email: data.ownerEmail,
        links: data.links,
        description: data.description,
        ownerName: data.ownerName,
        ownerImage: user?.photoURL,
        productImage: result.data.data.display_url,
      };
      const productResult = await axiosSecure.post("/product", productItem);
      if (productResult.data.insertedId) {
        Swal.fire({
          title: "Product Added Successfully!",
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
        navigate("/dashboard/my-product");
      }
    }
  };

  return (
    <div className="flex items-center justify-center lg:w-full min-h-screen w-[360px] md:w-[768px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex  p-10 flex-col gap-4 border-2bg-white/30 shadow-2xl rounded-lg border-teal-500 backdrop-brightness-200"
      >
        <div className="flex w-full gap-4">
          <input
            placeholder="Product Name"
            className="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500 w-1/2 h-12 px-5 rounded-lg outline-none"
            {...register("productName", { required: true })}
          />
          <input
            type="file"
            className="file-input w-1/2 max-w-xs bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500"
            {...register("image", { required: true })}
          />
        </div>

        <div className="flex w-full gap-4">
          <input
            readOnly
            defaultValue={user?.email}
            className="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500 w-1/2 h-12 px-5 rounded-lg"
            type="email"
            {...register("ownerEmail", { required: true })}
          />
          <input
            placeholder="Links"
            className="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500 w-1/2 h-12 px-5 rounded-lg"
            {...register("links", { required: true })}
          />
        </div>
        <textarea
          placeholder="Description"
          className="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500 h-[200px] p-3 resize-none rounded-lg"
          {...register("description", { required: true })}
        />
        <div className="flex gap-0 justify-between lg:flex-row md:flex-row flex-col">
          <div className="flex gap-3">
            <input
              className="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500 h-12  rounded-lg px-3"
              type="text"
              readOnly
              defaultValue={user?.displayName}
              {...register("ownerName", { required: true })}
            />
            <img
              src={user?.photoURL}
              className="w-14 h-14 rounded-full p-1 border-2 border-teal-700"
              alt=""
              {...register("ownerImage")}
            />
          </div>

          <TagsInput
            value={selected}
            onChange={setSelected}
            name="AI"
            placeHolder="enter tags"
            classNames="bg-transparent border-b-2 border-r-2 border-l-2 border-teal-500"
          />
        </div>

        <input
          className="bg-teal-500 p-3 cursor-pointer text-white font-semibold rounded-xl w-[100px]"
          type="submit"
        />
      </form>
    </div>
  );
}
