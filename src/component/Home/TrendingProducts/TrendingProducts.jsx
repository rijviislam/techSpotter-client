import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Vote from "../../../assets/up-arrow.png";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosUser from "../../../hooks/useAxiosUser";

export default function TrendingProducts() {
  const axiosProducts = useAxiosUser();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [sortedVote, setSortedVote] = useState([]);
  const navigate = useNavigate();
  const {
    data: trendingProducts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const result = await axiosProducts.get("/trending-products");
      return result.data;
    },
  });

  useEffect(() => {
    if (trendingProducts.length > 0) {
      const sortedProducts = [...trendingProducts].sort(
        (a, b) => b.voteCount - a.voteCount
      );
      setSortedVote(sortedProducts);
    }
  }, [trendingProducts]);

  useEffect(() => {
    if (trendingProducts.length > 0) {
      const sortedProducts = [...trendingProducts].sort(
        (a, b) => b.voteCount - a.voteCount
      );
      setSortedVote(sortedProducts);
    }
  }, [trendingProducts]);

  const handleProductVote = async (id, currentVoteCount, email) => {
    const findVotedProduct = trendingProducts.find((item) => item._id === id);
    if (
      findVotedProduct.votedEmail &&
      findVotedProduct.votedEmail.includes(email)
    ) {
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
    try {
      await mutateAsync({ id, voteCount });
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, voteCount }) => {
      if (user) {
        const result = await axiosSecure.patch(`/trending-products/${id}`, {
          voteCount,
          votedEmail: user.email,
        });
        return result.data;
      }
      return navigate("/login");
    },
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) {
    return <div>Error....</div>;
  }

  return (
    <div className="m-8 my-10">
      <h2 className="text-3xl text-teal-600 font-bold mb-4">
        TrendingProducts
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 place-items-center">
        {sortedVote.slice(0, 6).map((product) => (
          <div
            key={product._id}
            className="card card-compact lg:w-[350px] bg-base-100 shadow-xl border-y-2 border-teal-600 h-[400px]"
          >
            <figure className="w-full h-[250px] ">
              <img
                className="w-[350px] h-full object-cover"
                src={product.productImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body ">
              <Link
                to={`/product-details/${product._id}`}
                className="underline"
              >
                <h2 className="card-title">{product.productName}</h2>
              </Link>
              <div>
                {product?.tags?.map((tag, idx) => (
                  <p className="flex gap-1" key={idx}>
                    {tag}
                  </p>
                ))}
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={() =>
                    handleProductVote(
                      product._id,
                      product.voteCount,
                      user?.email
                    )
                  }
                  disabled={product?.email === user?.email}
                  className="rounded-lg w-16 flex items-center cursor-pointer justify-between p-1 px-2 bg-teal-900"
                >
                  <img className="w-5 h-5" src={Vote} alt="" />
                  {parseInt(product.voteCount)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/products" className="mt-5 flex items-center justify-center">
        <button className="btn btn-outline btn-accent">
          Show All Products
        </button>
      </Link>
    </div>
  );
}
