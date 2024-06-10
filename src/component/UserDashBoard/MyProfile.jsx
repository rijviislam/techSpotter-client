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
    <div className="w-[360px] md:w-[768px] lg:w-full h-screen flex flex-col items-center justify-center">
      <div className=" h-20 w-20  flex ">
        <img
          className="rounded-full w-full h-full border-2 border-teal-500 p-1"
          src={user?.photoURL}
          alt=""
        />
        {userInfo.status === "verified" && (
          <img className="w-8 h-8" src={Verified} alt="verified" />
        )}
      </div>
      <h2 className="text-3xl font-semibold my-3">{user?.displayName}</h2>
      <h4 className="text-2xl font-semibold my-2">{user?.email}</h4>
      {userInfo.status !== "verified" && (
        <div className="join mt-3">
          <input
            className="input input-bordered join-item"
            placeholder="Email"
          />
          <Link to="/dashboard/payment">
            <button
              onClick={handleSubscribe}
              className="btn join-item rounded-r-full bg-teal-600"
            >
              $ 15 to subscribe
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
