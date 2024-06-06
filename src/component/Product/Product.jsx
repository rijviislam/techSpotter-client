import { useQuery } from "@tanstack/react-query";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function Product() {
  const axiosProducts = useAxiosUser();
  const {
    data: acceptedProduct = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["acceptedProduct"],
    queryFn: async () => {
      const result = await axiosProducts.get("/product");
      return result.data;
    },
  });
  if (isLoading) return <p>Loading.....</p>;
  console.log(acceptedProduct);
  return (
    <div>
      <h2 className="text-3xl">Product</h2>
      <div className="flex items-center justify-center my-5">
        <label className="input w-[400px] input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {acceptedProduct.map((product) => (
          <Link key={product._id} to={`/product-details/${product._id}`}>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-20 h-20"
                  src={product.productImage}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>

                <div className="card-actions justify-between">
                  <button
                    // onClick={() =>
                    //   handleProductVote(product._id, product.voteCount)
                    // }
                    className="btn btn-primary"
                  >
                    {parseInt(product.voteCount)}
                    <TbArrowBigUpLineFilled />
                  </button>
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
