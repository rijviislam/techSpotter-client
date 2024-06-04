import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function ManageUsers() {
  const axiosAllUserGet = useAxiosUser();
  const {
    data: allUsers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const result = await axiosAllUserGet.get("/all-users");
      console.log(result.data);
      return result.data;
    },
  });
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error....</p>;
  console.log(allUsers);
  return (
    <div>
      <h2 className="text-3xl">ManageUsers: {allUsers.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                <td>{user.name}</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
