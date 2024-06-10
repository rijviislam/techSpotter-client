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
  if (isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (isError) return <span className="loading loading-bars loading-lg"></span>;
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
        className="mySwiper w-[360px] md:w-[760px] lg:w-full"
      >
        {productReview.map((rev) => (
          <SwiperSlide
            key={rev._id}
            className="flex items-center justify-center flex-col "
          >
            <img
              className="w-14 h-14 rounded-full border-2 border-teal-500 p-1"
              src={rev.reviewerImage}
              alt=""
            />
            <h2 className="text-xl font-medium">{rev.reviewerName}</h2>
            <p className="text-sm">{rev.description}</p>
            <p>{rev.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    );
}
