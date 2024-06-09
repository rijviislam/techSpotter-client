import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PieChart from "../shared/PieChart";

export default function Statistics() {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-users");
      return result.data;
    },
  });
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-product");
      return result.data;
    },
  });
  const { data: allReview = [] } = useQuery({
    queryKey: ["allReview"],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-review");
      return result.data;
    },
  });
  console.log(allUsers.length, allProduct.length, allReview.length);
  const chartData = [
    { name: "All Users", value: allUsers.length },
    { name: "All Product", value: allProduct.length },
    { name: "All Review", value: allReview.length },
  ];
  isLoading && <p>Loading...</p>;
  isError && <p>Error loading data.</p>;
  return (
    <div className="w-[360px] lg:w-full">
      <h2 className="text-3xl mt-10 text-teal-600 font-bold">Statistics</h2>

      {!isLoading && !isError && (
        <PieChart data={chartData} width={800} height={800} />
      )}
    </div>
  );
}
