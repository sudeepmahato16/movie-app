import React from "react";
import { useFetch } from "./../utils/useFetch";
import { maxWidth } from "./../styles/styles";
import { SkeletonTheme } from "react-loading-skeleton";
import { useGlobalContext } from "../context/context";
import Skeleton from "react-loading-skeleton";

interface Props {
  category: string;
  id: number;
}

const VideoSection = ({ category, id }: Props) => {
  const { data, isLoading } = useFetch({
    category,
    getVideo: true,
    id,
    key: "videos",
  });

  const { theme } = useGlobalContext();

  const isThemeLight = theme === "Light";

  if (isLoading) {
    return (
      <SkeletonTheme
        baseColor={isThemeLight ? "#f5f5f5" : "#333"}
        highlightColor={isThemeLight ? "#eee" : "#444"}
      >
        <div className={`flex flex-col gap-8 py-24  ${maxWidth}`}>
          {Array.from({ length: 2 }).map((_item, index) => {
            return (
              <div key={index} className="flex flex-col gap-1">
                <Skeleton width={70} />
                <Skeleton height={420} width={840} />
              </div>
            );
          })}
        </div>
      </SkeletonTheme>
    );
  }

  const youtubeVideos = data.results.slice(0, 2);

  return (
    <section className={` flex flex-col gap-16 py-24  ${maxWidth} `}>
      {youtubeVideos.map((video: any) => {
        return (
          <div
            key={video.id}
            className={`sm:w-[80%] w-[90%] mx-auto flex flex-col gap-2`}
          >
            <h2 className="text-secColor font-nunito font-semibold text-[24px]">
              {video.name}
            </h2>
            <div className="w-[100%] lg:h-[480px] md:h-[420px] sm:h-[320px] h-[210px] rounded-md mx-auto shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${video.key}?enablejsapi=1&origin=http://127.0.0.1:5173/`}
                title="trailer"
                width="100%"
                height="100%"
                className="rounded-md"
                allowFullScreen
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default VideoSection;
