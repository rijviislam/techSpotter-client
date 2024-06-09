import CouponSlider from "./CouponSlider";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Hero from "./Hero";
import TrendingProducts from "./TrendingProducts/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <TrendingProducts />
      <CouponSlider />
    </div>
  );
}
