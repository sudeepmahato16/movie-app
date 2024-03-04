import React from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { cn } from "@/utils/helper";

interface ImageProps {
  src: string;
  className: string;
  alt: string;
  width: string | number;
  height: string | number;
  effect?: "zoomIn";
}

const Image: React.FC<ImageProps> = ({
  src,
  className,
  width,
  alt,
  height,
  effect,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={cn(
        "transition-all duration-300 ease-in",
        className,
        !isImageLoaded
          ? `opacity-0 ${effect === "zoomIn" ? "scale-95" : ""}`
          : `opacity-100 ${effect === "zoomIn" ? "scale-100" : ""}`
      )}
      onLoad={onLoad}
    />
  );
};

export default Image;
