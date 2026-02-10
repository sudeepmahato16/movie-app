import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";

import { MovieCard } from "@/common";
import { useWatchlist } from "@/context/watchlistContext";
import { smallMaxWidth } from "@/styles";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <section className={`${smallMaxWidth} pt-28 pb-8`}>
      <h2 className="sm:text-3xl xs:text-2xl text-xl font-extrabold dark:text-secColor text-black mb-8 font-nunito">
        My Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 dark:text-gray-400 text-gray-500">
          <BsBookmark className="text-5xl" />
          <p className="sm:text-lg text-base font-medium font-nunito">
            Your watchlist is empty
          </p>
          <Link
            to="/movie"
            className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap xs:gap-4 gap-[14px] justify-center">
          {watchlist.map((item) => (
            <div
              key={item.id}
              className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
            >
              <MovieCard movie={item} category={item.category} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;
