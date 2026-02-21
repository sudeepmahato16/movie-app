import React, { useContext, useState, useEffect } from "react";
import { saveWatchlist, getWatchlist } from "@/utils/helper";
import { IMovie } from "@/types";

const context = React.createContext({
  watchlist: [] as IMovie[],
  addToWatchlist: (_item: IMovie) => {},
  removeFromWatchlist: (_id: string) => {},
  isInWatchlist: (_id: string) => false as boolean,
});

interface Props {
  children: React.ReactNode;
}

const WatchlistProvider = ({ children }: Props) => {
  const [watchlist, setWatchlist] = useState<IMovie[]>(getWatchlist);

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const addToWatchlist = (item: IMovie) => {
    setWatchlist((prev) => [...prev, item]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const isInWatchlist = (id: string) => {
    return watchlist.some((item) => String(item.id) === String(id));
  };

  return (
    <context.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </context.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlist = () => {
  return useContext(context);
};
