import { useCallback, memo } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { mainHeading, maxWidth, paragraph, watchBtn } from "./../styles/styles";
import { staggerContainer, slideDown } from "../utils/motion";

import Poster from "./Poster";

const HeroSlide = ({ movie }: { movie: any }) => {
  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;

  const { getTrailerId, toggleModal } = useGlobalContext();
  const navigate = useNavigate();

  const showTrailer = useCallback(() => {
    getTrailerId(id);
    toggleModal();
  }, [getTrailerId, toggleModal]);

  const handleWatchNow = useCallback(() => {
    navigate(`/movie/${id}`);
  }, [navigate]);


  return (
    <div
      className={`${maxWidth} mx-auto flex items-center h-full  flex-row lg:gap-32 sm:gap-20`}
    >
      <m.div
        variants={staggerContainer(0.2, 0.4)}
        initial="hidden"
        animate="show"
        className="text-gray-300 sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col sm:gap-5 xs:gap-3 gap-[10px] sm:mb-8"
      >
        <m.h2 variants={slideDown} className={`${mainHeading} `}>
          {title}
        </m.h2>
        <m.p variants={slideDown} className={paragraph}>
          {overview.length > 180 ? `${overview.slice(0, 180)}...` : overview}
        </m.p>
        <m.div
          variants={slideDown}
          className="flex flex-row items-center  gap-4 sm:mt-6 xs:mt-5 mt-[18px] "
        >
          <button
            type="button"
            name="watch-now"
            className={`${watchBtn} bg-[#ff0000] shadow-glow
             text-shadow text-secColor `}
            onClick={handleWatchNow}
          >
            Watch now
          </button>
          <button
            type="button"
            name="watch-trailer"
            className={`${watchBtn} text-shadow watch-trailer
             `}
            onClick={showTrailer}
          >
            Watch trailer
          </button>
        </m.div>
      </m.div>

      <Poster title={title} posterPath={posterPath} classes="flex-1" />
    </div>
  );
};

export default memo(HeroSlide);
