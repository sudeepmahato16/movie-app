import { FC, ReactNode } from "react";
import { m } from "framer-motion";

interface OverlayProps {
  className?: string;
  children: ReactNode;
}

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Overlay: FC<OverlayProps> = ({ className, children }) => {
  return (
    <m.div
      variants={variants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={`fixed top-0 left-0 z-[20] bg-blackOverlay w-screen h-screen ${className}`}
    >
      {children}
    </m.div>
  );
};

export default Overlay;
