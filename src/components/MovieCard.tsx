import React, { useMemo } from "react";

import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const MovieCard = ({
  movie,
  category,
  offset,
}: {
  movie: any;
  category: string;
  offset?: number;
}) => {
  const { poster_path, original_title: title, name, id } = movie;

  const imageSrc = useMemo(
    () => `https://image.tmdb.org/t/p/original/${poster_path}`,
    [poster_path]
  );

  return (
    <>
      <Link
        to={`/${category}/${id}`}
        className="dark:bg-[#1f1f1f] bg-[#f5f5f5] rounded-lg relative group w-[170px]"
      >
        <LazyLoad height={250} offset={offset ? offset : 100}>
          <img
            src={imageSrc}
            alt={movie.original_title}
            className="h-[250px] w-full object-cover rounded-lg drop-shadow-md shadow-md group-hover:shadow-none group-hover:drop-shadow-none transition-all duration-300"
          />
        </LazyLoad>

        <div className="absolute top-0 left-0 w-[170px] h-full group-hover:opacity-100 opacity-0 bg-[rgba(0,0,0,0.6)] transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="text-[48px] text-[#ff0000] scale-[0.4] group-hover:scale-100 transition-all duration-300 ">
            <FaYoutube />
          </div>
        </div>
      </Link>
      <h4 className="dark:text-gray-300 text-center text-base font-medium">
        {(title?.length > 50 ? title.split(":")[0] : title) || name}
      </h4>
    </>
  );
};

export default MovieCard;
