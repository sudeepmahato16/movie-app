import { useState, useCallback } from "react";
import { m } from "framer-motion";
import { useParams } from "react-router-dom";

import { useGetShowQuery } from "../../services/TMDB";

import { Poster, Loader, Error, Section } from "../../common";
import { Casts, VideoSection, Genre } from "./components";

import { mainHeading, maxWidth, paragraph } from "../../styles";
import { staggerContainer, fadeDown } from "../../utils/motion";

const Detail = () => {
  const { category, id } = useParams();
  const [show, setShow] = useState<Boolean>(false);

  const {
    data: movie,
    isLoading,
    isFetching,
    isError,
  } = useGetShowQuery({
    category: String(category),
    id: Number(id),
  });

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
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

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url('https://image.tmdb.org/t/p/original/${posterPath}'`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };

  return (
    <>
      <section className="w-full" style={backgroundStyle}>
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
              variants={fadeDown}
              className={`${mainHeading} md:max-w-[420px]`}
            >
              {title || name}
            </m.h2>

            <m.ul
              variants={fadeDown}
              className="flex flex-row items-center md:gap-4 sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap"
            >
              {genres.map((genre: { name: string; id: number }) => {
                return <Genre key={genre.id} name={genre.name} />;
              })}
            </m.ul>

            <m.p variants={fadeDown} className={paragraph}>
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
                onClick={toggleShow}
              >
                {!show ? "show more" : "show less"}
              </button>
            </m.p>

            <m.h3
              variants={fadeDown}
              className="text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]"
            >
              Top Casts
            </m.h3>

            <Casts casts={credits.cast} />
          </m.div>
        </div>
      </section>

      <VideoSection videos={videos.results} />

      <Section
        title={`Similar ${category === "movie" ? "movies" : "series"}`}
        category={String(category)}
        className={`${maxWidth}`}
        id={Number(id)}
        showSimilarShows={true}
      />
    </>
  );
};

export default Detail;
