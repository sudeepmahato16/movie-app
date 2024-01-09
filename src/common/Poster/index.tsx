import { memo } from "react";
import { m } from "framer-motion";

import Image from "../Image";
import { cn } from "@/utils/helper";
import { useMotion } from "@/hooks/useMotion";

interface PosterPropsType {
  posterPath: string;
  title: string;
  className?: string;
}

const Poster = ({ posterPath, title, className }: PosterPropsType) => {
  const { zoomIn } = useMotion();
  return (
    <m.div
      variants={zoomIn(0.6, 0.8)}
      initial="hidden"
      animate="show"
      className={cn(`md:block hidden h-[380px] w-[254px]`, className)}
    >
      <Image
        width={254}
        height={380}
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt={title}
        className="h-[380px] w-[254px] object-cover rounded-xl  shadow-lg transition-all duration-300"
      />
    </m.div>
  );
};

export default memo(Poster);
