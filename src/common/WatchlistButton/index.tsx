import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useWatchlist } from "@/context/watchlistContext";
import type { IMovie } from "@/types";

interface Props {
  movie: IMovie;
  category: "movie" | "tv";
  variant?: "icon" | "full";
}

const WatchlistButton = ({ movie, category, variant = "icon" }: Props) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie, category);
    }
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-[#ff0000] text-white hover:-translate-y-1 shadow-md"
      >
        {saved ? <BsBookmarkFill /> : <BsBookmark />}
        {saved ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white text-sm hover:bg-black/80 transition-colors duration-200"
    >
      {saved ? <BsBookmarkFill className="text-yellow-400" /> : <BsBookmark />}
    </button>
  );
};

export default WatchlistButton;
