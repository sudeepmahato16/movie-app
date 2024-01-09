import { useCallback, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

export const useMotion = () => {
  const isMiniScreen = useMediaQuery("(max-width: 768px)");

  const zoomIn = useCallback(
    (scale: number, duration: number) => ({
      hidden: {
        opacity: 0,
        scale,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
      show: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  const staggerContainer = useCallback(
    (staggerChildren: number, delayChildren: number) =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              opacity: 0,
            },
            show: {
              opacity: 1,
              transition: {
                staggerChildren,
                delayChildren,
              },
            },
          },
    [isMiniScreen]
  );

  const fadeDown = useMemo(
    () =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              y: "-25px",
              opacity: 0,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "tween",
                opacity: {
                  duration: 0.6,
                },
              },
            },
          },
    [isMiniScreen]
  );

  const fadeUp = useMemo(
    () =>
      isMiniScreen
        ? undefined
        : {
            hidden: {
              y: 50,
              x: 50,
              opacity: 0,
            },
            show: {
              y: 0,
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "tween",
              },
            },
          },
    [isMiniScreen]
  );

  const slideIn = useCallback(
    (direction: string, type: string, delay: number, duration: number) => ({
      hidden: {
        x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
        y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        transition: {
          duration,
          ease: "easeInOut",
        },
      },
      show: {
        x: 0,
        y: 0,
        transition: {
          type,
          delay,
          duration,
          ease: "easeInOut",
        },
      },
    }),
    []
  );

  return {
    zoomIn,
    fadeDown,
    fadeUp,
    staggerContainer,
    slideIn,
  };
};
