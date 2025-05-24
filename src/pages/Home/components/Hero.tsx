import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useEffect, useRef } from "react";

import HeroSlide from "./HeroSlide";
import { useGlobalContext } from "@/context/globalContext";
import { IMovie } from "@/types";

const Hero = ({ movies }: { movies: IMovie[] }) => {
  const { isModalOpen } = useGlobalContext();

  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    if (isModalOpen) {
      swiper.autoplay?.stop();
    } else {
      swiper.autoplay?.start();
    }
  }, [isModalOpen]);

  return (
    <Swiper
      ref={swiperRef}
      className="mySwiper lg:h-screen sm:h-[640px] xs:h-[520px] h-[460px] w-full"
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {movies.map((movie) => {
        return (
          <SwiperSlide
            key={movie.id}
            style={{
              backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.5)),url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" h-full w-full will-change-transform motion-reduce:transform-none"
          >
            {({ isActive }) => (isActive ? <HeroSlide movie={movie} /> : null)}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
