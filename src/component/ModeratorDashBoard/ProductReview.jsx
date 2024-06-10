import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ProductReview() {
  const axiosSecure = useAxiosSecure();
  const {
    data: allProduct = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const result = await axiosSecure.get("/product-review-queue");
      return result.data;
    },
  });
  console.log(allProduct);

  const handleAccept = (id) => {
    axiosSecure.patch(`/product-review-queue-accept/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Accepted");
        alert("Product Accept successfully!");
        refetch();
      }
    });
  };
  const handleFeatured = (id) => {
    axiosSecure.patch(`/product-review-queue-feature/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Accepted");
        alert("Product Accept successfully!");
        refetch();
      }
    });
  };
  const handleReject = (id) => {
    axiosSecure.patch(`/product-review-queue-reject/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Rejected");
        alert("Product Reject successfully!");
        refetch();
      }
    });
  };
  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>Error.....</p>;
  return (
    <div className="lg:w-full w-[360px] md:w-[768px]">
      <h2 className="text-3xl my-10 text-teal-600 font-bold">ProductReview</h2>

      <div>
        <div className="overflow-x-auto my-10">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Details</th>
                <th>Make Featured</th>
                <th>Accept</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {allProduct.map((product, idx) => (
                <tr key={product.t_id}>
                  <th>{idx + 1}</th>
                  <td>{product.productName}</td>
                  <td>
                    <Link to={`/product-details/${product._id}`}>
                      <button className="btn btn-sm bg-blue-500 font-semibold text-white rounded-md">
                        Details
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleFeatured(product._id)}
                      className="btn btn-sm bg-red-500 font-semibold text-white rounded-md"
                    >
                      Make Featured
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAccept(product._id)}
                      disabled={product.status === "accepted"}
                      className="btn btn-sm bg-emerald-500 text-gray-600"
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleReject(product._id)}
                      disabled={product.status === "reject"}
                      className="btn btn-sm bg-blue-500 font-semibold text-white rounded-md"
                    >
                      Reject
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
