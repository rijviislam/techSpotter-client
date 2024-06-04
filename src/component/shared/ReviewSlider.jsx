import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ReviewSlider() {
  return (
    <div className="w-[500px]">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper flex"
      >
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 4
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 5
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 6
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 7
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 8
        </SwiperSlide>
        <SwiperSlide className="border border-red-600 w-[200px] h-[200px]">
          Slide 9
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
