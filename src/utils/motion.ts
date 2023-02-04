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
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const slideDown = {
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


export const slideUp = {
  hidden: {
    y: 50,
    x: 50,
    opacity: 0,
  },
  show: {
    y:0,
    x:0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: 'tween', 
    },
  },
};


