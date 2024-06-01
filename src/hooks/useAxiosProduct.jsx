import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosUser from "./useAxiosUser";

export default function useAxiosProduct() {
  const axiosUserProducts = useAxiosUser();
  const { user } = useAuth();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosUserProducts.get(`/my-product/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  console.log(products);
  return [products, isLoading, refetch];
}
