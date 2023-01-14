export const zoomIn = (scale: number, duration: number) => ({
  hidden: {
    opacity: 0,
    scale,
    transition: {
      duration,
      ease: "easeIn",
    },
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: "easeIn",
    },
  },
});

export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
) => ({
  hidden: {
  },
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const slideUp = {
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
      type: 'tween',
    },
  },
};
