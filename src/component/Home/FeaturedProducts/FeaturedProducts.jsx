import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Vote from "../../../assets/up-arrow.png";
import useAxiosUser from "../../../hooks/useAxiosUser";

export default function FeaturedProducts() {
  const axiosProducts = useAxiosUser();
  const [allSortproducts, setAllSortProducts] = useState([]);
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosProducts.get("/feature-products");
      console.log(result.data);
      return result.data;
    },
  });
  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.postedTime) - new Date(a.postedTime)
      );
      setAllSortProducts(sortedProducts);
    }
  }, [products]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error on products</div>;
  }

  console.log(allSortproducts);
  return (
    <div className="m-8 -z-50">
      <h2 className="text-3xl text-teal-600 font-bold mb-4">
        Featured Products{" "}
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4">
        {allSortproducts.slice(0, 4).map((product) => (
          <div
            key={product._id}
            className="card w-70 bg-base-100 shadow-xl -z-50"
          >
            <figure>
              <img src={product.productImage} alt="#" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <p>Tags</p>
              <button className="rounded-lg w-16 flex items-center justify-between p-1 px-2 bg-teal-900">
                {" "}
                <img className="w-5 h-5" src={Vote} alt="" />{" "}
                {product.voteCount}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
