import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useGlobalContext } from "../context/context";
import HeroSlide from "./HeroSlide";

const Hero = ({ movies }: { movies: any }) => {
  const { theme } = useGlobalContext();

  return (
    <Swiper
      className="mySwiper lg:h-screen sm:h-[640px] xs:h-[520px] h-[460px] w-full"
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 12000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {movies.map((movie: any) => {
        return (
          <SwiperSlide
            key={movie.id}
            style={{
              backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="transition-all duration-300 ease-in h-full w-full "
          >
            {({ isActive }) => (isActive ? <HeroSlide movie={movie} /> : "")}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
