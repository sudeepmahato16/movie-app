import { useGlobalContext } from "../context/context";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkelatonLoader = ({ classes }: { classes?: string }) => {
  const { theme } = useGlobalContext();

  const isThemeLight = theme === "Light";
  return (
    <SkeletonTheme
      baseColor={isThemeLight ? "#f5f5f5" : "#333"}
      highlightColor={isThemeLight ? "#eee" : "#444"}
    >
      <div className={classes}>
        <div className="flex justify-between items-center mb-4">
          <Skeleton width={100} />
          <Skeleton width={100} />
        </div>

        <div className="flex flex-row items-center gap-[20px] py-4 overflow-hidden">
          {Array.from({ length: Math.floor(screen.width / 170) }).map(
            (_item, index) => {
              return (
                <div key={index}>
                  <Skeleton height={250} width={170} />
                  <div className="text-center">
                    <Skeleton className="mt-4 w-[80%] " />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkelatonLoader;
