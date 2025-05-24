import { useReducedMotion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

export const useMotion = () => {
  const isMiniScreen = useMediaQuery("(max-width: 768px)");
  const shouldReduceMotion = useReducedMotion();

  const isMotionDisabled = shouldReduceMotion || isMiniScreen;

  const zoomIn = useCallback(
    (scale: number, duration: number) =>
      isMotionDisabled
        ? undefined
        : {
            hidden: {
              opacity: 0,
              transform: `scale(${scale})`,
              transition: {
                duration,
                ease: "easeInOut",
              },
            },
            show: {
              opacity: 1,
              transform: "scale(1)",
              transition: {
                duration,
                ease: "easeInOut",
              },
            },
          },
    [isMotionDisabled]
  );

  const staggerContainer = useCallback(
    (staggerChildren: number, delayChildren: number) =>
      isMotionDisabled
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
    [isMotionDisabled]
  );

  const fadeDown = useMemo(
    () =>
      isMotionDisabled
        ? undefined
        : {
            hidden: {
              transform: "translate(0, -25px)",
              opacity: 0,
            },
            show: {
              transform: "translate(0, 0)",
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
                type: "tween",
                opacity: {
                  duration: 0.625,
                },
              },
            },
          },
    [isMotionDisabled]
  );

  const fadeUp = useMemo(
    () =>
      isMotionDisabled
        ? undefined
        : {
            hidden: {
              transform: "translate(50px, 50px)",
              opacity: 0,
            },
            show: {
              transform: "translate(0, 0)",
              opacity: 1,
              transition: {
                duration: 0.4,
                ease: "easeOut",
                type: "tween",
              },
            },
          },
    [isMotionDisabled]
  );

  const slideIn = useCallback(
    (direction: string, type: string, delay: number, duration: number) =>
      isMotionDisabled
        ? undefined
        : {
            hidden: {
              transform:
                `translate(${
                  direction === "left"
                    ? "-100%"
                    : direction === "right"
                    ? "100%"
                    : "0"
                }, ` +
                `${
                  direction === "up"
                    ? "-100%"
                    : direction === "down"
                    ? "100%"
                    : "0"
                })`,

              transition: {
                duration,
                ease: "easeInOut",
              },
            },
            show: {
              transform: "translate(0, 0)",
              transition: {
                type,
                delay,
                duration,
                ease: "easeInOut",
              },
            },
          },
    [isMotionDisabled]
  );

  return {
    zoomIn,
    fadeDown,
    fadeUp,
    staggerContainer,
    slideIn,
  };
};
