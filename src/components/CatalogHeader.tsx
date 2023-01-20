import React from "react";
import bgImg from "./../assets/footer-bg.jpg";

const CatalogHeader = ({ category }: { category: string }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[25vh] relative"
    >
      <h2 className="text-white font-nunito capitalize font-semibold text-xl absolute top-[50%] left-1/2 -translate-x-1/2 translate-y-8 ">
        {category === "movie" ? "movies" : "TV series"}
      </h2>
    </div>
  );
};

export default CatalogHeader;
