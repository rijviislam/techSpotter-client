import { useQuery } from "@tanstack/react-query";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../mystyle.css";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function CouponSlider() {
  const axiosSecure = useAxiosSecure();

  // GET COUPONS //
  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const result = await axiosSecure.get("/coupons");
      return result.data;
    },
  });
  const expiryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p>Error....</p>;
  console.log(coupons);
  return (
    <div className="my-10">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper mx-10"
        slidesPerView={3}
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id} className="flex gap-1 lg:gap-5">
            <div className="ticket">
              <div className="datas ">
                <div className="ribbon">
                  <div className="label text-sm">Code: {coupon.couponCode}</div>
                </div>
                <span className="text-black font-semibold text-xl mt-10">
                  Discount Amount:
                  {coupon.discountAmount}
                </span>
                <p className="text-xl text-black mt-5">
                  {coupon.couponCodeDescription}
                </p>
              </div>
              <p className="text-teal-950 text-3xl font-medium">
                {expiryDate(coupon.expiryDate)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
