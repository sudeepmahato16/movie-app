import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { mainHeading, maxWidth, watchBtn } from "./../styles/styles";
import { staggerContainer, slideDown } from "../utils/motion";

import Poster from "./Poster";

const HeroSlide = ({ movie }: { movie: any }) => {
  const {
    overview,
    original_title: title,
    poster_path: posterPath,
    id,
  } = movie;
  const { theme, getTrailerId, openModal } = useGlobalContext();
  const navigate = useNavigate();

  const showTrailer = (id: number) => {
    getTrailerId(id);
    openModal();
  };

  return (
    <div
      className={`${maxWidth} mx-auto flex items-center h-full  flex-row lg:gap-32 gap-16`}
    >
      <motion.div
        variants={staggerContainer(0.2, 0.4)}
        initial="hidden"
        animate="show"
        className="dark:text-gray-300 text-[#555] sm:max-w-[80vw] max-w-[90vw]  md:max-w-[420px] font-nunito flex flex-col gap-5 mb-8"
      >
        <motion.h2
          variants={slideDown}
          className={`${mainHeading("text-4xl")}`}
        >
          {title}
        </motion.h2>
        <motion.p variants={slideDown} className="text-base leading-relaxed">
          {overview.length > 180 ? `${overview.slice(0, 180)}...` : overview}
        </motion.p>
        <motion.div
          variants={slideDown}
          className="flex flex-row items-center gap-4 mt-6"
        >
          <button
            type="button"
            className={`${watchBtn} bg-[#ff0000] ${
              theme === "Dark" ? "shadow-glow" : "shadow-glowLight"
            } text-shadow text-secColor `}
            onClick={() => {
              navigate(`/movie/${id}`);
            }}
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

      <Poster title={title} posterPath={posterPath} classes="flex-1" />
    </div>
  );
};

export default HeroSlide;
