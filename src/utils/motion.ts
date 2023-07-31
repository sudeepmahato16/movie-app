const isMobile = window.innerWidth < 768;
export const zoomIn = (scale: number, duration: number) => ({
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
});

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
) =>
  isMobile
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
      };

export const fadeDown = isMobile
  ? undefined
  : {
      hidden: {
        opacity: 0,
        y: -25,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          type: "tween",
        },
      },
    };

export const fadeUp = isMobile
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
    };

export const slideIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number
) => ({
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
});
