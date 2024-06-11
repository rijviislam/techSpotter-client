import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReportBtn from "../../assets/sign.png";
import Vote from "../../assets/up-arrow.png";
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
    voteCount: initialVoteCount,
    description,
    productImage,
    email,
    votedEmail = [],
  } = useLoaderData();
  const axiosUser = useAxiosUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [disable, setDisable] = useState(false);
  const [review, setReview] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(initialVoteCount);
  const [localVotedEmail, setLocalVotedEmail] = useState(votedEmail);
  const [reviews, setReviews] = useState([]);

  const { register, handleSubmit, reset } = useForm();
  const reviewerImage = user?.photoURL;
  const reviewerName = user?.displayName;
  const productId = _id;

  const handleReport = (id) => {
    if (user?.email === email) {
      return Swal.fire({
        title: "Owner cannot report his post!",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    }
    axiosSecure.patch(`/product-details/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Product Reported successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        setDisable(true);
      }
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const reviewItem = {
      review,
      description: data.description,
      reviewerName,
      reviewerImage,
      productId,
    };
    const postReview = await axiosUser.post("/review", reviewItem);

    if (postReview.data.insertedId) {
      Swal.fire({
        title: "Review Added",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
      reset();
      setIsSubmitting(false);
      setReview(0);
      setReviews((prevReviews) => [postReview.data, ...prevReviews]);
    }
  };

  const handleProductVote = async (id, currentVoteCount, email) => {
    const findEmail = localVotedEmail.find(
      (votedEmail) => votedEmail === email
    );

    if (findEmail) {
      Swal.fire({
        title: "You have already voted",
        text: "You can only vote for a product once.",
        icon: "warning",
        confirmButtonText: "OK",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
      return;
    }

    const voteCount = parseInt(currentVoteCount, 10) + 1;
    const updatedVotedEmail = [...localVotedEmail, email];

    setLocalVoteCount(voteCount);
    setLocalVotedEmail(updatedVotedEmail);

    try {
      await mutateAsync({ id, voteCount, updatedVotedEmail });
      Swal.fire({
        title: "Voted",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    } catch (error) {
      setLocalVoteCount(currentVoteCount);
      setLocalVotedEmail(votedEmail);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, voteCount, updatedVotedEmail }) => {
      if (user) {
        const result = await axiosSecure.patch(`/trending-products/${id}`, {
          voteCount,
          votedEmail: updatedVotedEmail,
        });
        return result.data;
      }
      return navigate("/login");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["product", _id], (oldData) => ({
        ...oldData,
        voteCount: data.voteCount,
        votedEmail: data.votedEmail,
      }));
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center flex-col overflow-x-hidden">
      <div className="flex items-center flex-col justify-center my-5 w-[1200px]">
        <div className="lg:w-[800px] md:w-[600px] w-[350px] h-[200px] lg:h-[450px]">
          <img
            src={productImage}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-semibold">{productName}</h2>
        <p className="lg:w-[600px] md:w-[500px] w-[350px]">{description}</p>
        <Link className="underline">{links}</Link>
        <div className="flex justify-between  lg:w-[800px] md:w-[500px] w-[360px]">
          <button
            onClick={() => handleProductVote(_id, localVoteCount, user.email)}
            className=" rounded-lg w-16 flex items-center cursor-pointer justify-between p-1 px-2 bg-teal-900"
          >
            <img className="w-5 h-5" src={Vote} alt="Vote" />
            {localVoteCount}
          </button>
          <button
            onClick={() => handleReport(_id)}
            disabled={disable}
            className=" rounded-lg w-16 flex items-center justify-center cursor-pointer p-1 px-2 bg-teal-400"
          >
            <img src={ReportBtn} className="w-5 h-5" alt="report" />
          </button>
        </div>
        <div className="lg:w-[500px] md:w-[500px] w-[350px]  flex items-center justify-center">
          <ReviewSlider id={_id} />
        </div>
        <div className="w-[360px] md:w-[400px] lg:w-[600px] flex flex-col items-center">
          <form
            className="flex w-[360px] md:w-[500px] lg:w-full flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="my-2 bg-white w-full h-[50px] p-2 rounded-lg"
              defaultValue={user?.displayName}
              readOnly
              {...register("reviewerName", { required: true })}
            />
            <input
              className="my-2 bg-white w-full h-[50px] p-2 rounded-lg"
              defaultValue={user?.photoURL}
              readOnly
              {...register("reviewerImage", { required: true })}
            />
            <input
              className="my-2 bg-white w-full h-[50px] p-2 rounded-lg"
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
              className="bg-blue-500 text-gray-600 p-3 font-semibold rounded-xl cursor-pointer mt-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
