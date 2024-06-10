import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-users");
      console.log(result.data);
      return result.data;
    },
  });
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error....</p>;
  const handleModerator = (id) => {
    console.log(id);
    axiosSecure.patch(`/make-moderator/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Moderator");
        alert("Make Moderator successfully!");
        // setBtnDisable(true);
        refetch();
      }
    });
  };
  const handleAdmin = (id) => {
    console.log(id);
    axiosSecure.patch(`/make-admin/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Moderator");
        alert("Make Moderator successfully!");
        // setBtnDisable(true);
        refetch();
      }
    });
  };
  console.log(allUsers);
  return (
    <div className="lg:w-full  w-[360px] md:w-[768px]">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">ManageUsers</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User name</th>
              <th>User email</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleModerator(user._id)}
                    className="btn btn-sm bg-cyan-400 text-gray-600"
                  >
                    Moderator
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleAdmin(user._id)}
                    className="btn btn-sm bg-purple-700 text-white-900"
                  >
                    Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
