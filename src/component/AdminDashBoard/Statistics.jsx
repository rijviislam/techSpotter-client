// import { useQuery } from "@tanstack/react-query";
// import useAxiosUser from "../../hooks/useAxiosUser";
// import PieChart from "../shared/PieChart";

// export default function Statistics() {
//   const axiosAllUserGet = useAxiosUser();
//   const {
//     data: allUsers = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["allUsers"],
//     queryFn: async () => {
//       const result = await axiosAllUserGet.get("/all-users");
//       console.log(result.data);
//       return result.data;
//     },
//   });
//   return (
//     <div>
//       <h2 className="text-3xl">Statistics</h2>
//       {/* <PieChart /> */}
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../hooks/useAxiosUser";
import PieChart from "../shared/PieChart";

export default function Statistics() {
  const axiosAllUserGet = useAxiosUser();
  const {
    data: allUsers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const result = await axiosAllUserGet.get("/all-users");
      return result.data;
    },
  });
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allProduct"],
    queryFn: async () => {
      const result = await axiosAllUserGet.get("/all-product");
      return result.data;
    },
  });
  const { data: allReview = [] } = useQuery({
    queryKey: ["allReview"],
    queryFn: async () => {
      const result = await axiosAllUserGet.get("/all-review");
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
    <div>
      <h2 className="text-3xl">Statistics</h2>

      {!isLoading && !isError && <PieChart data={chartData} />}
    </div>
  );
}
