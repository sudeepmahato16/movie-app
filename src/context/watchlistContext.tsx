import React, { useContext, useState, useCallback } from "react";
import { getWatchlist, saveWatchlist } from "@/utils/helper";
import type { IMovie, IWatchlistItem } from "@/types";

const context = React.createContext({
  watchlist: [] as IWatchlistItem[],
  addToWatchlist: (movie: IMovie, category: "movie" | "tv") => {},
  removeFromWatchlist: (id: string) => {},
  isInWatchlist: (id: string) => false as boolean,
});

interface Props {
  children: React.ReactNode;
}

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<IWatchlistItem[]>(getWatchlist);

  const addToWatchlist = useCallback((movie: IMovie, category: "movie" | "tv") => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      const next = [...prev, { ...movie, category }];
      saveWatchlist(next);
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveWatchlist(next);
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: string) => watchlist.some((item) => item.id === id),
    [watchlist]
  );

  return (
    <context.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
