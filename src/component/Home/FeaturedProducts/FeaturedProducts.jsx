import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosUser from "../../../hooks/useAxiosUser";

export default function FeaturedProducts() {
  const axiosProducts = useAxiosUser();
  const [allSortproducts, setAllSortProducts] = useState([]);
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosProducts.get("/feature-products");
      return result.data;
    },
  });
  useEffect(() => {
    const sortProducts = products.sort(
      (a, b) => new Date(b.postedTime) - new Date(a.postedTime)
    );
    setAllSortProducts(sortProducts);
  }, [products]);

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
