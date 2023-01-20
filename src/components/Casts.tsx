import React from "react";
import { useFetch } from "./../utils/useFetch";
import LazyLoad from "react-lazy-load";
import { motion } from "framer-motion";
import { slideDown, staggerContainer } from "./../utils/motion";

const Casts = ({ id, category }: { id: number; category: string }) => {
  const { data, isLoading } = useFetch({
    getCredits: true,
    id,
    category,

    key: `casts-${id}`,
  });

  if (isLoading) {
    return <></>;
  }

  const casts = data.cast.slice(0, 4);

  return (
    <motion.div
      variants={staggerContainer(0.2, 1)}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-4 -mt-2"
    >
      {casts.map((cast: any) => {
        return (
          <motion.figure
            variants={slideDown}
            key={cast.id}
            className="flex flex-col justify-start gap-1"
          >
            <LazyLoad height={100}>
              <img
                src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                alt={cast.name}
                className="h-[96px] rounded-md shadow-md"
              />
            </LazyLoad>
            <h4 className="text-gray-300 text-[12px] max-w-[64px] text-center">
              {cast.name}
            </h4>
          </motion.figure>
        );
      })}
    </motion.div>
  );
};

export default Casts;
