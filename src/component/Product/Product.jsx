import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Vote from "../../assets/up-arrow.png";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosUser from "../../hooks/useAxiosUser";
export default function Product() {
  const axiosProducts = useAxiosUser();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const itemsPerPage = 6;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: acceptedProduct = { result: [], pagination: { pageCount: 0 } },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["acceptedProduct", page, searchTags],
    queryFn: async () => {
      const result = await axiosProducts.get(
        `/product?page=${page}&tags=${searchTags}`
      );
      return result.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (acceptedProduct) {
      setPageCount(acceptedProduct.pagination.pageCount);
    }
  }, [acceptedProduct]);

  const handlePrev = () => {
    setPage((p) => (p > 1 ? p - 1 : p));
  };

  const handleNext = () => {
    setPage((p) => (p < pageCount ? p + 1 : p));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchTags(inputValue);
    setPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const handleProductVote = async (id, currentVoteCount, email) => {
    const findVotedProduct = acceptedProduct.find((item) => item._id === id);
    if (
      findVotedProduct.votedEmail &&
      findVotedProduct.votedEmail.includes(email)
    ) {
      Swal.fire({
        title: "You have already voted",
        text: "You can only vote for a product once.",
        icon: "warning",
        confirmButtonText: "OK",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
      return;
    }

    const voteCount = parseInt(currentVoteCount, 10) + 1;
    try {
      await mutateAsync({ id, voteCount });
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, voteCount }) => {
      if (user) {
        const result = await axiosSecure.patch(`/trending-products/${id}`, {
          voteCount,
          votedEmail: user.email,
        });
        return result.data;
      }
      return navigate("/login");
    },
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) return <p>Loading.....</p>;
  if (isError) return <p>Error loading data...</p>;

  return (
    <div>
      <h2 className="text-3xl">Product</h2>
      <div className="flex items-center justify-center my-5">
        <label className="input w-[400px] input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search by tags"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
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
          </button>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {acceptedProduct.result.map((product) => (
          <Link key={product._id} to={`/product-details/${product._id}`}>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-20 h-20"
                  src={product.productImage}
                  alt="Product"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-between">
                  <button
                    onClick={() =>
                      handleProductVote(
                        product._id,
                        product.voteCount,
                        user?.email
                      )
                    }
                    disabled={product?.email === user?.email}
                    className="rounded-lg w-16 flex items-center justify-between p-1 px-2 bg-teal-900"
                  >
                    <img className="w-5 h-5" src={Vote} alt="" />
                    {parseInt(product.voteCount)}
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-5 gap-2">
        <button
          disabled={page === 1}
          className="btn btn-sm"
          onClick={handlePrev}
        >
          Prev
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button
          disabled={page === pageCount}
          className="btn btn-sm"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
