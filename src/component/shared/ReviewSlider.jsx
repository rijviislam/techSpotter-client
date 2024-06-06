import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide from "swiper/react"
import "../../../node_modules/swiper/swiper-bundle.min.css";
import useAxiosUser from "../../hooks/useAxiosUser";

export default function ReviewSlider({ id }) {
  console.log(id);
  const axiosProducts = useAxiosUser();
  const [productReview, setProductReview] = useState([]);

  const {
    data: review = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const result = await axiosProducts.get("/review");
      return result.data;
    },
  });

  useEffect(() => {
    const filterReview = review.filter((rev) => rev.productId === id);
    setProductReview(filterReview);
    refetch();
  }, [id, refetch, review]);
  console.log(productReview);
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error....</p>;
  if (productReview)
    return (
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {productReview.map((rev) => (
          <SwiperSlide
            key={rev._id}
            className="flex items-center justify-center flex-col"
          >
            <img className="w-10 h-10" src={rev.reviewerImage} alt="" />
            <h2 className="text-">{rev.reviewerName}</h2>
            <h2>{rev.description}</h2>
            <p>{rev.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    );
}
