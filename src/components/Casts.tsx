import LazyLoad from "react-lazy-load";
import { motion } from "framer-motion";
import { slideDown, staggerContainer } from "./../utils/motion";

const Casts = ({ casts }: { casts: any }) => {
  const topCasts = casts.slice(0, 4);

  return (
    <motion.div
      variants={staggerContainer(0.2, 1)}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-4 -mt-2"
    >
      {topCasts.map((cast: any) => {
        const { id, profile_path: profilePath, name } = cast;
        return (
          <motion.figure
            variants={slideDown}
            key={id}
            className="flex flex-col justify-start gap-1"
          >
            <LazyLoad height={100}>
              <img
                src={`https://image.tmdb.org/t/p/original/${profilePath}`}
                alt={name}
                className="h-[96px] w-[64px] object-cover rounded-md shadow-md"
              />
            </LazyLoad>
            <h4 className="text-gray-300 text-[12px] max-w-[64px] text-center font-semibold">
              {name}
            </h4>
          </motion.figure>
        );
      })}
    </motion.div>
  );
};

export default Casts;
