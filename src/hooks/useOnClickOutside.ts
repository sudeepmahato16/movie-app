import { useEffect, useRef } from "react";

interface IUseOutsideClick {
  action: () => void;
  listenCapturing?: boolean;
  enable?: boolean;
}

export const useOnClickOutside = ({
  action,
  listenCapturing = true,
  enable = true,
}: IUseOutsideClick) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('hello')
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        action();
      }
    };
    if (enable) {
      document.addEventListener("click", handleClick, listenCapturing);
    } else {
      document.removeEventListener("click", handleClick, listenCapturing);
    }

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing, enable]);

  return { ref };
};
