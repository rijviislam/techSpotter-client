import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosUser from "../../../hooks/useAxiosUser";

export default function TrendingProducts() {
  const axiosProducts = useAxiosUser();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [checked, setChecked] = useState([]);
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
      console.log(result.data);
      return result.data;
    },
  });

  console.log(checked);
  useEffect(() => {
    if (trendingProducts.length > 0) {
      const sortedProducts = [...trendingProducts].sort(
        (a, b) => b.voteCount - a.voteCount
      );
      setSortedVote(sortedProducts);
    }
  }, [trendingProducts]);

  // ------------------------------------------------

  // const handleProductVote = async (id, currentVoteCount, email) => {
  //   const hasVoted = checked.includes(id); // Check if the user has already voted for this product
  //   if (hasVoted) {
  //     console.log("You have already voted for this product.");
  //     return;
  //   }
  //   try {
  //     await mutateAsync({ id, voteCount: currentVoteCount + 1 });
  //     setChecked([...checked, id]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const { mutateAsync } = useMutation({
  //   mutationFn: async ({ id, voteCount, email }) => {
  //     if (user) {
  //       const currentProduct = await axiosProducts.get(`/product/${id}`);
  //       const product = currentProduct.data;
  //       if (product.votedEmail.includes(email)) {
  //         console.log("You voting this product already !");
  //         return;
  //       }
  //       const votedPersonEmail = [...product.votedEmail, email];
  //       const result = await axiosSecure.put(`/trending-products/${id}`, {
  //         voteCount,
  //         votedEmail: votedPersonEmail,
  //       });
  //       console.log(result.data);
  //       return result.data;
  //     }
  //     return navigate("/login");
  //   },
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });

  // -----------------------------------------
  const handleProductVote = async (
    id,
    currentVoteCount,
    email,
    mutateAsync,
    setChecked,
    checked,
    axiosProducts,
    axiosSecure,
    user,
    navigate,
    refetch
  ) => {
    try {
      // Check if checked array is initialized
      if (!Array.isArray(checked)) {
        console.log("Checked array is not initialized.");
        return;
      }

      const hasVoted = checked.includes(id); // Check if the user has already voted for this product
      if (hasVoted) {
        console.log("You have already voted for this product.");
        return;
      }

      if (user) {
        const currentProduct = await axiosProducts.get(`/product/${id}`);
        const product = currentProduct.data;
        if (product.votedEmail.includes(email)) {
          console.log("You voting this product already !");
          return;
        }
        const votedPersonEmail = [...product.votedEmail, email];
        const result = await axiosSecure.put(`/trending-products/${id}`, {
          voteCount: currentVoteCount + 1,
          votedEmail: votedPersonEmail,
        });
        console.log(result.data);
        mutateAsync({ id, voteCount: currentVoteCount + 1 }); // Update the vote count using mutateAsync
        setChecked([...checked, id]); // Update the list of checked products
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <span className="loading loading-infinity loading-xl text-5xl"></span>
    );
  if (isError) {
    return <div>Error on trending products</div>;
  }

  return (
    <div className="m-8">
      <h2 className="text-3xl text-teal-600 font-bold mb-4">
        TrendingProducts
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {sortedVote.slice(0, 6).map((product) => (
          <div
            key={product._id}
            className="card card-compact w-96 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-20 h-20"
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
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() =>
                    handleProductVote(
                      product._id,
                      product.voteCount,
                      user.email
                    )
                  }
                  disabled={product?.email === user?.email}
                  // disabled={user?.email === product.email}
                  className="btn btn-primary"
                >
                  {parseInt(product.voteCount)}
                  <TbArrowBigUpLineFilled />
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
