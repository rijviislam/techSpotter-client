import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function MyProfile() {
  const { user } = useAuth();
  const axiosUser = useAxiosUser();
  const {
    data: userInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosUser.get(`/users/user/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <div className="w-20 h-20">
        <img src={user?.photoURL} alt="" />
      </div>
      <h2 className="text-3xl">{user?.displayName}</h2>
      <h4 className="text-2xl">{user?.email}</h4>
      <div className="join">
        <input className="input input-bordered join-item" placeholder="Email" />
        <button className="btn join-item rounded-r-full">
          $ 5 to subscribe
        </button>
      </div>
    </div>
  );
}
