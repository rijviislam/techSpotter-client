import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TbArrowBigUpLineFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function Product() {
  const axiosProducts = useAxiosUser();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const itemsPerPage = 6;

  const {
    data: acceptedProduct = { result: [], pagination: { pageCount: 0 } },
    isLoading,
    isError,
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
                  <button className="btn btn-primary">
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
