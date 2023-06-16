import React from "react";
import { useState } from "react";

interface ImageProps {
  src: string;
  className: string;
  alt: string;
  zoomIn?: boolean;
}

const Image: React.FC<ImageProps> = ({
  src,
  className,
  alt,
  zoomIn = false,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <img
      src={src}
      alt={alt}
      className={`${
        !isImageLoaded
          ? `opacity-0 ${zoomIn ? "scale-95" : ""}`
          : `opacity-100 ${zoomIn ? "scale-100" : ""}`
      } ${className}`}
      onLoad={handleLoad}
    />
  );
};

export default Image;
