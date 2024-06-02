import { useLoaderData } from "react-router-dom";

export default function UpdateProduct() {
  const { _id } = useLoaderData();
  return (
    <div>
      <h2 className="text-3xl">Update Product {_id}</h2>
    </div>
  );
}
