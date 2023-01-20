import React, { useState } from "react";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { useFetch } from "./../utils/useFetch";

import {
  Casts,
  Genre,
  Poster,
  SuggestedMoviesSeries,
  VideoSection,
} from "../components";

import { mainHeading, maxWidth } from "./../styles/styles";
import { staggerContainer, slideDown } from "../utils/motion";

const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState<Boolean>(false);
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useFetch({
    getDetail: true,
    category: String(category),
    id: Number(id),
    key: `detail-${id}`,
  });

  const { theme } = useGlobalContext();

  // if(isError){
  //   return <h4>{error}</h4>
  // }

  if (isLoading) {
    return <></>;
  }

  const { title, poster_path: posterPath, overview, name, genres } = movie;

  return (
    <>
      <section
        className="w-full"
        style={{
          backgroundImage: `${
            theme === "Dark"
              ? "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4))"
              : "linear-gradient(to bottom, rgba(255,255,255,.8), rgba(255,255,255,.6))"
          },url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <div
          className={`${maxWidth} py-36 flex flex-row gap-12 justify-center `}
        >
          <Poster title={title} posterPath={posterPath} />
          <motion.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="dark:text-gray-300 text-[#555] sm:max-w-[80vw] max-w-[90vw]  md:max-w-[520px] font-nunito flex flex-col gap-5 mb-8 flex-1"
          >
            <motion.h2
              variants={slideDown}
              className={`${mainHeading("text-4xl")} md:max-w-[420px]`}
            >
              {title || name}
            </motion.h2>

            <motion.ul
              variants={slideDown}
              className="flex flex-row items-center gap-4 flex-wrap"
            >
              {genres.map((genre: { name: string; id: number }) => {
                return <Genre key={genre.id} name={genre.name} />;
              })}
            </motion.ul>

            <motion.p
              variants={slideDown}
              className="text-base leading-relaxed"
            >
              <span>
                {overview.length > 280
                  ? `${show ? overview : `${overview.slice(0, 280)}...`}`
                  : overview}
              </span>
              <button
                type="button"
                className={`${
                  overview.length > 280 ? "inline-block" : "hidden"
                } font-semibold ml-1`}
                onClick={() => setShow((prev) => !prev)}
              >
                {!show ? "show more" : "show less"}
              </button>
            </motion.p>

            <motion.h3
              variants={slideDown}
              className="dark:text-secColor font-bold text-[18px]"
            >
              Casts
            </motion.h3>

            <Casts id={Number(id)} category={String(category)} />
          </motion.div>
        </div>
      </section>

      <LazyLoad height={800} once>
        <VideoSection category={String(category)} id={Number(id)} />
      </LazyLoad>

      <LazyLoad height={320} once>
        <SuggestedMoviesSeries category={String(category)} id={Number(id)} />
      </LazyLoad>
    </>
  );
};

export default Detail;
