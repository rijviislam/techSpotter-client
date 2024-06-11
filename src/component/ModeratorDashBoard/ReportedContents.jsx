import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ReportedContents() {
  const axiosSecure = useAxiosSecure();

  const {
    data: reported,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reported"],
    staleTime: 0,
    queryFn: async () => {
      const result = await axiosSecure.get("/reported-products", {
        params: { reported: true },
      });
      return result.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <p>Error occer</p>;

  const handleDeleteProduct = async (id) => {
    const result = await axiosSecure.delete(`/product/${id}`);
    if (result.data.deletedCount) {
      Swal.fire({
        title: "Delete successfully!",
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
  };

  return (
    <div className="lg:w-full  w-[360px] md:w-[768px]">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">
        Reported Contents
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reported?.map((product, idx) => (
                <tr key={product._id}>
                  <th>{idx + 1}</th>
                  <th>{product.productName}</th>
                  <td>
                    <Link to={`/product-details/${product._id}`}>
                      <button className="badge-md bg-blue-500 font-semibold text-white rounded-md">
                        Details
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="badge-md bg-red-500 font-semibold text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
