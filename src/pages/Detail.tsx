import { useState } from "react";
import { m } from "framer-motion";
import LazyLoad from "react-lazyload";
import { useParams } from "react-router-dom";

import { useGetShowQuery } from "../services/TMDB";
import { useGlobalContext } from "../context/context";

import {
  Casts,
  Genre,
  Poster,
  Section,
  VideoSection,
  Loader,
} from "../components";

import { mainHeading, maxWidth, paragraph } from "./../styles/styles";
import { staggerContainer, slideDown } from "../utils/motion";

const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState<Boolean>(false);
  const { theme } = useGlobalContext();

  const {
    data: movie,
    isLoading,
    isFetching,
  } = useGetShowQuery({
    category: String(category),
    id: Number(id),
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const {
    title,
    poster_path: posterPath,
    overview,
    name,
    genres,
    videos,
    credits,
  } = movie;

  return (
    <>
      <section
        className="w-full"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}'`,
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      >
        <div
          className={`${maxWidth} lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center `}
        >
          <Poster title={title} posterPath={posterPath} />
          <m.div
            variants={staggerContainer(0.2, 0.4)}
            initial="hidden"
            animate="show"
            className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[520px] font-nunito flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1"
          >
            <m.h2
              variants={slideDown}
              className={`${mainHeading} md:max-w-[420px]`}
            >
              {title || name}
            </m.h2>

            <m.ul
              variants={slideDown}
              className="flex flex-row items-center md:gap-4 sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres.map((genre: { name: string; id: number }) => {
                return <Genre key={genre.id} name={genre.name} />;
              })}
            </m.ul>

            <m.p variants={slideDown} className={paragraph}>
              <span>
                {overview.length > 280
                  ? `${show ? overview : `${overview.slice(0, 280)}...`}`
                  : overview}
              </span>
              <button
                type="button"
                className={`${
                  overview.length > 280 ? "inline-block" : "hidden"
                } font-bold ml-1 hover:underline transition-all duration-300`}
                onClick={() => setShow((prev) => !prev)}
              >
                {!show ? "show more" : "show less"}
              </button>
            </m.p>

            <m.h3
              variants={slideDown}
              className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
            >
              Top Casts
            </m.h3>

            <Casts casts={credits.cast} />
          </m.div>
        </div>
      </section>

      <LazyLoad height={800} once>
        <VideoSection videos={videos.results} />
      </LazyLoad>

      <LazyLoad height={320} once>
        <Section
          title={`Similar ${category === "movie" ? "movies" : "series"}`}
          category={String(category)}
          classes={`${maxWidth}`}
          id={Number(id)}
          showSimilarShows={true}
        />
      </LazyLoad>
    </>
  );
};

export default Detail;
