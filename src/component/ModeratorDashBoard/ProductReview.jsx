import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function ProductReview() {
  const axiosAllProduct = useAxiosUser();
  // const [btnDisable, setBtnDisable] = useState(false);
  const {
    data: allProduct = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const result = await axiosAllProduct.get("/product-review-queue");
      return result.data;
    },
  });
  console.log(allProduct);

  const handleAccept = (id) => {
    axiosAllProduct.patch(`/product-review-queue-accept/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Accepted");
        alert("Product Accept successfully!");
        // setBtnDisable(true);
        refetch();
      }
    });
  };
  const handleReject = (id) => {
    axiosAllProduct.patch(`/product-review-queue-reject/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Rejected");
        alert("Product Reject successfully!");
        // setBtnDisable(true);
        refetch();
      }
    });
  };
  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>Error.....</p>;
  return (
    <div>
      <h2 className="text-3xl">ProductReview {allProduct.length}</h2>

      <div>
        <div className="overflow-x-auto">
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
                      <button className="badge-md bg-blue-500 font-semibold text-white rounded-md">
                        Details
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/product-details/${product._id}`}>
                      <button className="badge-md bg-blue-500 font-semibold text-white rounded-md">
                        Make Featured
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAccept(product._id)}
                      // disabled={btnDisable}
                      className="btn btn-sm bg-lime-300 text-gray-600"
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleReject(product._id)}
                      // disabled={btnDisable}
                      className="badge-md bg-blue-500 font-semibold text-white rounded-md"
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
