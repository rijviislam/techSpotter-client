// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosUser from "./useAxiosUser";

// export default function useUser() {
//   const { user, loader } = useAuth();
//   const axiosUser = useAxiosUser();
//   const { data: userInfo = [], isLoading } = useQuery({
//     queryKey: ["userInfo", user?.email],
//     enabled: !loader,
//     queryFn: async () => {
//       const res = await axiosUser.get(`/users/user/${user.email}`);
//       console.log(res.data);
//       return res.data?.userInfo;
//     },
//   });
//   console.log(userInfo);
//   return [userInfo, isLoading];
// }
