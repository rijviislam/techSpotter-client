import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosProduct from "../../hooks/useAxiosProduct";

export default function Product() {
  const [products, isLoading] = useAxiosProduct();
  if (isLoading) return <p>Loading.....</p>;
  return (
    <div>
      <h2 className="text-3xl">Product</h2>
      <div className="grid grid-cols-2 gap-5">
        {products.map((product) => (
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
