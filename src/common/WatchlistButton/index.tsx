import React from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useWatchlist } from "@/context/watchlistContext";
import { IMovie } from "@/types";

interface Props {
  item: IMovie;
  className?: string;
}

const WatchlistButton = ({ item, className = "" }: Props) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const saved = isInWatchlist(String(item.id));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeFromWatchlist(String(item.id));
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
      className={`text-xl hover:scale-125 active:scale-95 transition-transform duration-200 ${className}`}
    >
      {saved ? (
        <BsBookmarkFill className="text-yellow-400" />
      ) : (
        <BsBookmark className="text-white" />
      )}
    </button>
  );
};

export default WatchlistButton;
