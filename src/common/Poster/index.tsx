import { m } from "framer-motion";
import { zoomIn } from "../../utils/motion";
import { memo } from "react";

interface PosterPropsType {
  posterPath: string;
  title: string;
  className?: string;
}

const Poster = ({ posterPath, title, className }: PosterPropsType) => {
  return (
    <m.div
      variants={zoomIn(0.6, 0.8)}
      initial="hidden"
      animate="show"
      className={`${className} md:block hidden h-[380px] w-[254px]`}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        className="h-full w-full object-cover rounded-xl  shadow-lg"
      />
    </m.div>
  );
};

export default memo(Poster);
