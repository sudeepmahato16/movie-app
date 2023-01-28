import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useGlobalContext } from "../context/context";
import { skelatonLoaderPropsTypes } from "../types";

export const SkelatonLoader = ({
  classes,
  isMoviesSliderLoader = true,
}: skelatonLoaderPropsTypes) => {
  const { theme } = useGlobalContext();
  const isThemeLight = theme === "Light";

  const classNames = isMoviesSliderLoader
    ? `flex flex-row items-center gap-[20px] overflow-hidden`
    : `flex flex-row flex-wrap items-center gap-4 justify-center ${classes}`;

  const arrSize = isMoviesSliderLoader ? Math.floor(screen.width / 170) : 20;

  return (
    <SkeletonTheme
      baseColor={isThemeLight ? "#f5f5f5" : "#333"}
      highlightColor={isThemeLight ? "#eee" : "#444"}
    >
      <div className={classNames}>
        {Array.from({ length: arrSize }).map((_item, index) => {
          return (
            <div
              key={index}
              className={`${!isMoviesSliderLoader ? "mb-6" : ""}`}
            >
              <Skeleton height={250} width={170} />
              <div className="text-center">
                <Skeleton className="mt-4 w-[80%] " />
              </div>
            </div>
          );
        })}
      </div>
    </SkeletonTheme>
  );
};

export const Loader = () => {
  return (
    <div className="relative top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="loader" />
    </div>
  );
};

