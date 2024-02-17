import { memo, FC, useRef } from "react";
import { Link } from "react-router-dom";
import { useInView } from "framer-motion";

import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "../Loader";
import Error from "../Error";

import { useGetShowsQuery } from "@/services/TMDB";
import { useTheme } from "@/context/themeContext";
import { cn, getErrorMessage } from "@/utils/helper";

interface SectionProps {
  title: string;
  category: string;
  className?: string;
  type?: string;
  id?: number;
  showSimilarShows?: boolean;
}

const Section: FC<SectionProps> = ({
  title,
  category,
  className,
  type,
  id,
  showSimilarShows,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    margin: "100px",
    once: true,
  });

  const { theme } = useTheme();

  const {
    data = { results: [] },
    isLoading,
    isError,
    error,
  } = useGetShowsQuery(
    {
      category,
      type,
      page: 1,
      showSimilarShows,
      id,
    },
    {
      skip: !inView,
    }
  );

  const errorMessage = isError ? getErrorMessage(error) : "";

  const sectionStyle = cn(
    `sm:py-[20px] xs:py-[18.75px] py-[16.75px] font-nunito`,
    className
  );
  const linkStyle = cn(
    `sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full  dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`,
    theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
  );

  return (
    <section className={sectionStyle} ref={ref}>
      <div className="flex flex-row justify-between items-center sm:mb-6 mb-[22.75px]">
        <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
        {!showSimilarShows && (
          <Link to={`/${category}?type=${type}`} className={linkStyle}>
            View all
          </Link>
        )}
      </div>
      <div className="sm:h-[312px] xs:h-[309px] h-[266px]">
        {isLoading || !inView ? (
          <SkelatonLoader />
        ) : isError ? (
          <Error error={String(errorMessage)} className="h-full text-[18px]" />
        ) : (
          <MoviesSlides
            movies={data.results.slice(0, 12)}
            category={category}
          />
        )}
      </div>
    </section>
  );
};

export default memo(Section);
