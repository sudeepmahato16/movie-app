import React from "react";
import { moviesType } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

const MoviesSlides: React.FC<moviesType> = ({ movies, category }) => {
  return (
    <>
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        className="mySwiper"
      >
        {movies.map((movie: any) => {
          return (
            <SwiperSlide key={movie.id} className="flex flex-col gap-4 max-w-[170px] rounded-lg">
              <MovieCard movie={movie} category={category}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MoviesSlides;
