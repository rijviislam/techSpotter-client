import useAxiosProduct from "../../hooks/useAxiosProduct";
import TableRows from "../shared/TableRows";

export default function MyProducts() {
  const [products, isLoading] = useAxiosProduct();
  if (isLoading) return;
  <span className="loading loading-bars loading-lg "></span>;
  return (
    <div>
      <h2 className="text-3xl my-10 text-teal-600 font-bold">MyProducts</h2>

      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Number of votes</th>
                <th>Status</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <TableRows key={product._id} product={product} idx={idx} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
