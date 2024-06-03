import { useState } from "react";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function ProductDetails() {
  const {
    _id,
    productName,
    links,
    voteCount,
    description,
    productImage,
    email,
  } = useLoaderData();
  const axiosUser = useAxiosUser();
  const [disable, setDisable] = useState(false);
  const { user } = useAuth();

  const handleReport = (id) => {
    console.log(id);
    if (user?.email === email) {
      return alert("owner cannot report his post!");
    }
    axiosUser.patch(`/product-details/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        // /show a aleart
        console.log("Repoted");
        alert("Product Repoted successfully!");
        setDisable(true);
      }
    });
  };
  return (
    <div className="w-full">
      <h2 className="text-3xl">Product Details {_id}</h2>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={productImage} className="min-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{productName}</h1>
            <h1 className="text-2xl font-bold">{links}</h1>
            <p className="py-6">{description}</p>
            <div className="flex justify-between">
              <button
                // onClick={() =>
                //   handleProductVote(product._id, product.voteCount)
                // }
                className="btn btn-primary"
              >
                {parseInt(voteCount)}
                <TbArrowBigUpLineFilled />
              </button>
              <button
                onClick={() => handleReport(_id)}
                disabled={disable}
                className="btn btn-primary"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
