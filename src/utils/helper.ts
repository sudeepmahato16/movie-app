import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { IWatchlistItem } from "../types";

export const getErrorMessage = (error: any) => {
  let errorMessage;

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      errorMessage = errMsg;
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = "Unable to fetch the data. Please try again later.";
  }

  return errorMessage;
};

export const saveTheme = (theme: string) => {
  localStorage.setItem("theme", theme);
};

export const getTheme = () => {
  const theme = localStorage.getItem("theme");
  return theme ? theme : "";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const WATCHLIST_KEY = "tmovies-watchlist";

export const getWatchlist = (): IWatchlistItem[] => {
  const data = localStorage.getItem(WATCHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWatchlist = (watchlist: IWatchlistItem[]) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
};
