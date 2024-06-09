import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Vote from "../../../assets/up-arrow.png";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function FeaturedProducts() {
  const axiosSecure = useAxiosSecure();
  const [allSortproducts, setAllSortProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/feature-products");
      return result.data;
    },
  });

  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.postedTime) - new Date(a.postedTime)
      );

      const featuredProduct = sortedProducts.find(
        (product) => product.isFeatured === "true"
      );
      const latestProducts = sortedProducts.filter(
        (product) => product.isFeatured !== "true"
      );

      const allSortProducts = featuredProduct
        ? [featuredProduct, ...latestProducts.slice(0, 3)]
        : latestProducts.slice(0, 4);
      setAllSortProducts(allSortProducts);
    }
  }, [products]);

  const handleProductVote = async (id, currentVoteCount, email) => {
    console.log("Button clicked for product ID:", id);
    const findVotedProduct = allSortproducts.find((item) => item._id === id);
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
      console.error("Error in handleProductVote:", error);
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
      } else {
        navigate("/login");
      }
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error in mutateAsync:", error);
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }
  console.log(allSortproducts);
  return (
    <div className="m-8 -z-50">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">
        Featured Products
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5 ">
        {allSortproducts.map((product) => (
          <div
            key={product._id}
            className="card card-compact bg-base-100 shadow-xl border border-gray-600"
          >
            <figure className="w-full h-[250px] ">
              <img
                className="w-[350px] h-full object-cover"
                src={product.productImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <div>
                {" "}
                {product?.tags?.map((tag, idx) => (
                  <p key={idx}>{tag}</p>
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
                  disabled={product.email === user?.email}
                  className=" rounded-lg w-16 flex items-center cursor-pointer justify-between p-1 px-2 bg-teal-900"
                >
                  <img className="w-5 h-5" src={Vote} alt="Vote" />
                  {parseInt(product.voteCount)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4">
        {allSortproducts.map((product) => (
          <div
            key={product._id}
            className="card w-70 bg-base-100 shadow-xl -z-50"
          >
            <figure>
              <img src={product.productImage} alt={product.productName} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              {product.tags?.map((tag, idx) => (
                <p key={idx}>{tag}</p>
              ))}
              <button
                onClick={() =>
                  handleProductVote(product._id, product.voteCount, user?.email)
                }
                disabled={product.email === user?.email}
                className="border border-red-700 rounded-lg w-16 flex items-center cursor-pointer justify-between p-1 px-2 bg-teal-900"
              >
                <img className="w-5 h-5" src={Vote} alt="Vote" />
                {parseInt(product.voteCount)}
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
