import { useEffect } from "react";

export const useOnKeyPress = (
  key: string,
  action: (e: KeyboardEvent) => void,
  startListening = true
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) action(e);
    };

    if (startListening) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [action, key, startListening]);
};
