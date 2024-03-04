import { useEffect } from "react";

export const useOnKeyPress = (
  key: string,
  action: (e: KeyboardEvent) => void
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) action(e);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [action, key]);
};
