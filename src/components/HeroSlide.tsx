import React from "react";
import { motion } from "framer-motion";

import { useGlobalContext } from "../context/context";
import { maxWidth, watchBtn } from "./../styles/styles";
import { staggerContainer } from "../utils/motion";
import { slideUp, zoomIn } from "./../utils/motion";

const HeroSlide = ({ movie }: { movie: any }) => {
  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;
  const { theme, getTrailerId, openModal } = useGlobalContext();

  const showTrailer = (id: number) => {
    getTrailerId(id);
    openModal();
  }

  return (
    <div
      className={`${maxWidth} mx-auto flex items-center h-full  flex-row lg:gap-32 gap-16`}
    >
      <motion.div
        variants={staggerContainer(0.2, 0.4)}
        initial="hidden"
        animate="show"
        className="dark:text-gray-300 text-[#555] sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col gap-6 mb-8"
      >
        <motion.h2
          variants={slideUp}
          className="text-4xl font-extrabold leading-tight dark:text-secColor text-[#333] max-w-[420px]"
        >
          {title}
        </motion.h2>
        <motion.p variants={slideUp} className="text-base leading-relaxed">
          {overview.length > 180 ? `${overview.slice(0, 180)}...` : overview}
        </motion.p>
        <motion.div
          variants={slideUp}
          className="flex flex-row items-center gap-4 mt-6"
        >
          <button
            type="button"
            className={`${watchBtn} bg-[#ff0000] ${
              theme === "Dark" ? "shadow-glow" : "shadow-glowLight"
            } text-shadow text-secColor `}
          >
            Watch now
          </button>
          <button
            type="button"
            className={`${watchBtn} text-shadow ${
              theme === "Dark" ? "watch-trailer--dark" : "watch-trailer--light"
            } `}
            onClick={() => showTrailer(id)}
          >
            Watch trailer
          </button>
        </motion.div>
      </motion.div>

      <div className="flex-1  md:block hidden">
        <motion.img
          variants={zoomIn(0.5, 0.8)}
          initial="hidden"
          animate="show"
          src={`https://image.tmdb.org/t/p/original/${posterPath}`}
          alt={title}
          className="max-h-[380px] rounded-xl  shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSlide;
