import { useEffect, useRef } from "react";

export const useOnClickOutside = (
  action: () => void,
  listenCapturing = true
) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        action();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing]);

  return { ref };
};
