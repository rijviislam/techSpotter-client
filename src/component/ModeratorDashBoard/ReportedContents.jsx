// import { useQuery } from "@tanstack/react-query";
// import useAxiosUser from "../../hooks/useAxiosUser";

// export default function ReportedContents() {
//   const axiosProducts = useAxiosUser();
//   const {
//     data: reported = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["reported"],
//     queryFn: async () => {
//       const result = await axiosProducts.get("/reported-products", {
//         params: { reported: true },
//       });
//       console.log(result.data);
//       return result.data;
//     },
//   });
//   if (isLoading) return <p>Loading reported products...</p>;
//   if (isError) return <p>Error fetching reported products...</p>;

//   console.log(reported);
//   return (
//     <div>
//       <h2 className="text-3xl">Reported Contents: {reported.length}</h2>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosUser from "../../hooks/useAxiosUser"; // Assuming this fetches user data

export default function ReportedContents() {
  const axiosProducts = useAxiosUser();

  const {
    data: reported,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reported"],
    staleTime: 0,
    queryFn: async () => {
      const result = await axiosProducts.get("/reported-products", {
        params: { reported: true },
      });
      return result.data;
    },
  });

  if (isLoading) return <p>Loading reported products...</p>;
  if (isError) return <p>Error fetching reported products...</p>;

  console.log(reported);

  return (
    <div>
      <h2 className="text-3xl">Reported Contents</h2>
      {reported.map((product) => (
        <div key={product._id}>
          <h2 className="text2xl">{product.productName}</h2>
          <p>{product.reported}</p>
        </div>
      ))}
    </div>
  );
}
