import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosProduct from "../../hooks/useAxiosProduct";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function TableRows({ product, idx }) {
  const { _id, productName, voteCount, status } = product;
  const [products, isLoading, refetch] = useAxiosProduct();
  const axiosSecure = useAxiosSecure();

  const handleDeleteProduct = async (_id) => {
    const result = await axiosSecure.delete(`/product/${_id}`);
    console.log(result);
    if (result.data.deletedCount) {
      Swal.fire({
        title: "Product Delete successfully!",
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
    <tr>
      <th>{idx + 1}</th>
      <th>{productName}</th>
      <td>{voteCount}</td>
      <td>{status}</td>
      <td>
        <Link to={`/dashboard/update-produst/${_id}`}>
          <button className="badge-md bg-blue-500 font-semibold text-white rounded-md">
            Update
          </button>
        </Link>
      </td>
      <td>
        <button
          onClick={() => handleDeleteProduct(_id)}
          className="badge-md bg-red-500 font-semibold text-white rounded-md"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
