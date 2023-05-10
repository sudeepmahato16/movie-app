import bgImg from "./../../../assets/images/footer-bg.webp";

const CatalogHeader = ({ category }: { category: string }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.075), rgba(0,0,0,0.075)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="lg:h-[140px] md:h-[132px] sm:h-[114px] h-[96px] relative"
    >
      <h2 className="text-white font-nunito capitalize font-semibold md:text-xl sm:text-lg absolute md:top-[70%] sm:top-[65%] xs:top-[60%] top-[57.75%]  left-1/2 -translate-x-1/2  ">
        {category === "movie" ? "movies" : "TV series"}
      </h2>
    </div>
  );
};

export default CatalogHeader;
