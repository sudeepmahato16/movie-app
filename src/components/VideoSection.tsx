import React from "react";
import { maxWidth } from "./../styles/styles";

import { useGlobalContext } from "../context/context";

const VideoSection = ({ videos }: { videos: any }) => {
  const youtubeVideos = videos.slice(0, 2);

  return (
    <section className={` flex flex-col gap-16 py-24  ${maxWidth} `}>
      {youtubeVideos.map((video: any) => {
        return (
          <div
            key={video.id}
            className={`sm:w-[80%] w-[90%] mx-auto flex flex-col gap-2`}
          >
            <h2 className="text-secColor font-nunito font-semibold text-[24px] mb-1">
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
