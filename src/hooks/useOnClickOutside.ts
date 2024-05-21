import { useEffect, useRef } from "react";

export const useOnClickOutside = (
  action: () => void,
  listenCapturing = true,
  startListening = true
) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        action();
      }
    };
    if (startListening) {
      document.addEventListener("click", handleClick, listenCapturing);
    } else {
      document.removeEventListener("click", handleClick, listenCapturing);
    }

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing, startListening]);

  return { ref };
};
