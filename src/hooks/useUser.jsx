import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useUser() {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !loader,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [userInfo, isLoading, refetch];
}
