import React from "react";
import { moviesSlideProps } from "../../types";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "../MovieCard";

const MoviesSlides: React.FC<moviesSlideProps> = ({ movies, category }) => (
  <>
    <Swiper slidesPerView="auto" spaceBetween={15} className="mySwiper">
      {movies.map((movie: any) => {
        return (
          <SwiperSlide
            key={movie.id}
            className="flex flex-col sm:gap-4 xs:gap-3 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg"
          >
            <MovieCard movie={movie} category={category} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  </>
);

export default MoviesSlides;
