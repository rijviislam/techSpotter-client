import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
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
      return result.data;
    },
  });
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <p>Error....</p>;
  const handleModerator = (id) => {
    axiosSecure.patch(`/make-moderator/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Make Moderator successfully!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
        refetch();
      }
    });
  };
  const handleAdmin = (id) => {
    axiosSecure.patch(`/make-admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Make Moderator successfully!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
        refetch();
      }
    });
  };
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
