import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
