import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useAxiosProduct() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-product/${user.email}`);
      return res.data;
    },
  });
  return [products, isLoading, refetch];
}
