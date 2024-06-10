import { useEffect } from "react";

interface IUseKeyPress {
  key: string;
  action: (e: KeyboardEvent) => void;
  enable?: boolean;
}

export const useOnKeyPress = ({ key, action, enable = true }: IUseKeyPress) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log(e.key)
      if (e.key === key) action(e);
    };

    if (enable) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [action, key, enable]);
};
