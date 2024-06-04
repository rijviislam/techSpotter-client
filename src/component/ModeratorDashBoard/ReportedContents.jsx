import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function ReportedContents() {
  const axiosProducts = useAxiosUser();

  const {
    data: reported,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reported"],
    staleTime: 0,
    queryFn: async () => {
      const result = await axiosProducts.get("/reported-products", {
        params: { reported: true },
      });
      return result.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occer</p>;

  console.log(reported);

  const handleDeleteProduct = async (id) => {
    const result = await axiosProducts.delete(`/product/${id}`);
    console.log(result);
    if (result.data.deletedCount) {
      alert("Delete successfully!");
      refetch();
    }
  };

  return (
    <div>
      <h2 className="text-3xl">Reported Contents: {reported.length}</h2>
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