import HeroImage from "../../assets/istockphoto-1795167728-170667a.webp";
export default function Hero() {
  return (
    <div
      className="hero lg:min-h-screen md:min-h-screen h-1/2 w-[360px] md:w-[768px] lg:w-full -z-50"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-[700px]">
          <h1 className="mb-5 lg:text-5xl text-teal-500 md:text-4xl font-bold text-2xl -z-50 ">
            Explore The World Of <br />
            TECHNOLOGY
          </h1>
          <p className="mb-5w w-full mt-10 text-teal-600 text-xl">
            Join us at TechStopper to explore the latest in technology, gadgets,
            and innovations. Dive into expert reviews, insightful articles, and
            stay ahead with cutting-edge trends.
          </p>
        </div>
      </div>
    </div>
  );
}
