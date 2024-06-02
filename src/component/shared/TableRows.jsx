export default function TableRows({ product, idx }) {
  const { productName, voteCount, status } = product;
  return (
    <tr>
      <th>{idx + 1}</th>
      <th>{productName}</th>
      <td>{voteCount}</td>
      <td>{status}</td>
      <td>
        <button className="badge-md bg-blue-500 font-semibold text-white rounded-md">
          Update
        </button>
      </td>
      <td>
        <button className="badge-md bg-red-500 font-semibold text-white rounded-md">
          Delete
        </button>
      </td>
    </tr>
  );
}
