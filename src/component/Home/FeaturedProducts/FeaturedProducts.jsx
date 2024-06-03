import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
    <div>
      <h2 className="text-3xl">Featured Products {allSortproducts.length}</h2>
      <div>
        {allSortproducts.map((product) => (
          <p key={product._id}>{product.productName}</p>
        ))}
      </div>
    </div>
  );
}
