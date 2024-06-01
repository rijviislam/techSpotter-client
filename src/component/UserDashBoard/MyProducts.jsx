import useAxiosProduct from "../../hooks/useAxiosProduct";

export default function MyProducts() {
  const [products, isLoading] = useAxiosProduct();
  if (isLoading) return <p>Loadin....</p>;
  return (
    <div>
      <h2 className="text-3xl">MyProducts {products.length}</h2>
    </div>
  );
}
