import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useGlobalContext } from "../context/context";
import HeroSlide from "./HeroSlide";

const Hero = ({ movies }: { movies: any }) => {
  const { theme } = useGlobalContext();
  return (
    <Swiper
      className="mySwiper h-screen w-full"
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
              backgroundImage: `${
                theme === "Dark"
                  ? "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5))"
                  : "linear-gradient(to bottom, rgba(255,255,255,.8), rgba(255,255,255,.6))"
              },url('https://image.tmdb.org/t/p/original/${
                movie.backdrop_path
              }'`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}

            className="transition-all duration-300 ease-in h-full w-full "
          >
            {({ isActive }) => (isActive ? <HeroSlide movie={movie}/> : "")}
            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
