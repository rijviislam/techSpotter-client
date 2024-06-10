import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosUser from "../../hooks/useAxiosUser";
import ReviewSlider from "../shared/ReviewSlider";

export default function ProductDetails() {
  const { user } = useAuth();
  const {
    _id,
    productName,
    links,
    voteCount,
    description,
    productImage,
    email,
  } = useLoaderData();
  const axiosUser = useAxiosUser();
  const [disable, setDisable] = useState(false);
  const [review, setReview] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleReport = (id) => {
    console.log(id);
    if (user?.email === email) {
      return alert("owner cannot report his post!");
    }
    axiosSecure.patch(`/product-details/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Repoted");
        alert("Product Repoted successfully!");
        setDisable(true);
      }
    });
  };

  const { register, handleSubmit, reset } = useForm();
  const reviewerImage = user?.photoURL;
  const reviewerName = user?.displayName;
  const productId = _id;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const reviewItem = {
      review,
      description: data.description,
      reviewerName,
      reviewerImage,
      productId,
    };
    console.log(reviewItem);
    const postReview = await axiosUser.post("/review", reviewItem);

    if (postReview.data.insertedId) {
      console.log("Review Added");
      alert("Review Added!");
      reset();
      setIsSubmitting(false);
      setReview(0);
    }
  };

  return (
    <div className="w-full">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={productImage} className="min-w-sm rounded-lg shadow-2xl" />
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">{productName}</h1>
            <h1 className="text-2xl font-bold">{links}</h1>
            <p className="py-6">{description}</p>
            <div className="flex justify-between">
              <button
                // onClick={() =>
                //   handleProductVote(product._id, product.voteCount)
                // }
                className="btn btn-primary"
              >
                {parseInt(voteCount)}
                <TbArrowBigUpLineFilled />
              </button>
              <button
                onClick={() => handleReport(_id)}
                disabled={disable}
                className="btn btn-primary"
              >
                Report
              </button>
            </div>
            {/* REVIEW FORM  */}
            <div>
              <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="my-2 bg-white w-[400px] h-[50px] p-2"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("reviewerName", { required: true })}
                />
                <input
                  className="my-2 bg-white w-[400px] h-[50px] p-2"
                  defaultValue={user?.photoURL}
                  readOnly
                  {...register("reviewerImage", { required: true })}
                />
                <input
                  className="my-2 bg-white w-[400px] h-[50px] p-2"
                  type="text"
                  {...register("description", { required: true })}
                />
                <Rating
                  style={{ maxWidth: 220 }}
                  value={review}
                  onChange={setReview}
                />
                <input
                  type="submit"
                  className="bg-blue-500 text-gray-600 p-3 font-semibold rounded-xl cursor-pointer"
                />
              </form>
            </div>
            <div className="w-[500px] h-[300px]  flex items-center justify-center">
              <ReviewSlider id={_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
