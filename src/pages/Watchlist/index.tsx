import { m } from "framer-motion";
import { Link } from "react-router-dom";

import { MovieCard } from "@/common";
import { useWatchlist } from "@/context/watchlistContext";
import { useMotion } from "@/hooks/useMotion";
import { maxWidth, mainHeading } from "@/styles";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const { fadeDown, staggerContainer } = useMotion();

  return (
    <section className={`${maxWidth} pt-28 pb-14 min-h-[70vh]`}>
      <m.h1
        variants={fadeDown}
        initial="hidden"
        animate="show"
        className={`${mainHeading} mb-8`}
      >
        My Watchlist
      </m.h1>

      {watchlist.length === 0 ? (
        <m.div
          variants={fadeDown}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center justify-center gap-4 py-20 text-center"
        >
          <p className="dark:text-gray-400 text-gray-500 text-lg">
            Your watchlist is empty.
          </p>
          <Link
            to="/"
            className="text-sm font-medium dark:text-gray-300 hover:underline"
          >
            Browse movies and shows →
          </Link>
        </m.div>
      ) : (
        <m.div
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap xs:gap-4 gap-[14px] justify-center"
        >
          {watchlist.map((item) => {
            const category = item.original_title ? "movie" : "tv";
            return (
              <div
                key={item.id}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={item} category={category} />
              </div>
            );
          })}
        </m.div>
      )}
    </section>
  );
};

export default Watchlist;
