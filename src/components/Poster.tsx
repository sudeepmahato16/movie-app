import React from "react";
import { m } from "framer-motion";
import { zoomIn } from "./../utils/motion";

const Poster = ({
  posterPath,
  title,
  classes
}: {
  posterPath: string;
  title: string;
  classes?: string;
}) => {
  return (
    <div className={`${classes} md:block hidden `}>
      <m.img
        variants={zoomIn(0.4, 0.8)}
        initial="hidden"
        animate="show"
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        className="max-h-[380px] rounded-xl  shadow-lg"
      />
    </div>
  );
};

export default Poster;
