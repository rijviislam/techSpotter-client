import { Link } from "react-router-dom";
import useAxiosProduct from "../../hooks/useAxiosProduct";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function TableRows({ product, idx }) {
  const { _id, productName, voteCount, status } = product;
  const [products, isLoading, refetch] = useAxiosProduct();
  const axiosUser = useAxiosUser();

  const handleDeleteProduct = async (_id) => {
    const result = await axiosUser.delete(`/product/${_id}`);
    console.log(result);
    if (result.data.deletedCount) {
      alert("Delete successfully!");
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
        <Link to={`/user-dashboard/update-produst/${_id}`}>
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
