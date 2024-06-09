import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Verified from "../../assets/mark.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function MyProfile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: userInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleSubscribe = () => {
    // reset();
    console.log("Okkk");
  };
  console.log(userInfo);
  return (
    <div>
      <div className=" h-20 flex w-[360px] lg: w-full">
        <img src={user?.photoURL} alt="" />
        {userInfo.status === "verified" && (
          <img className="w-8 h-8" src={Verified} alt="verified" />
        )}
      </div>
      <h2 className="text-3xl">{user?.displayName}</h2>
      <h4 className="text-2xl">{user?.email}</h4>
      {userInfo.status !== "verified" && (
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Email"
          />
          <Link to="/dashboard/payment">
            <button
              onClick={handleSubscribe}
              className="btn join-item rounded-r-full"
            >
              $ 15 to subscribe
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
