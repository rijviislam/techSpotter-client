import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import useAxiosUser from "../../../hooks/useAxiosUser";

export default function TrendingProducts() {
  const axiosProducts = useAxiosUser();
  const [sortedVote, setSortedVote] = useState([]);
  const {
    data: trendingProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const result = await axiosProducts.get("/trending-produsts");
      console.log(result.data);
      return result.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, voteCount }) => {
      const result = await axiosProducts.patch(`/trending-produsts/${id}`, {
        voteCount,
      });
      console.log(result.data);
      return result.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    const sortVote = trendingProducts.sort((a, b) => b.voteCount - a.voteCount);
    setSortedVote(sortVote);
  }, [trendingProducts]);

  if (isLoading)
    return (
      <span className="loading loading-infinity loading-xl text-5xl"></span>
    );

  const handleProductVote = async (id, currentVoteCount) => {
    const voteCount = parseInt(currentVoteCount, 10) + 1;
    try {
      await mutateAsync({ id, voteCount });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl">TrendingProducts</h2>
      <div className="grid grid-cols-3 gap-5">
        {sortedVote.map((product) => (
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
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() =>
                    handleProductVote(product._id, product.voteCount)
                  }
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
    </div>
  );
}
