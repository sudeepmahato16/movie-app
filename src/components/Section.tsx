import { Link } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { useGetShowsQuery } from "../services/TMDB";

import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "./Loader";
import Error from "./Error";

import { sectionPropsType } from "../types";
import { getErrorMessage } from "../utils/helper";

const Section = ({
  title,
  category,
  classes,
  type,
  id,
  showSimilarShows,
}: sectionPropsType) => {
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useGetShowsQuery({
    category,
    type,
    page: 1,
    showSimilarShows,
    id,
  });

  const { theme } = useGlobalContext();

  let errorMessage;

  if (isError) {
    errorMessage = getErrorMessage(error);
  }

  return (
    <section
      className={`md:py-6 sm:py-[20.75px] xs:py-[18.75px] py-[16.75px] font-nunito ${classes}`}
    >
      <div
        className={`flex flex-row justify-between items-center sm:mb-6 mb-[22.75px]`}
      >
        <h3 className="sm:text-[22.25px] xs:text-[20px] text-[18.75px] dark:text-gray-50 sm:font-bold font-semibold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
        {!showSimilarShows && (
          <Link
            to={`/${category}?type=${type}`}
            className={`sm:py-1 py-[2px] sm:text-[14px] xs:text-[12.75px] text-[12px] sm:px-4 px-3 rounded-full  ${
              theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
            } dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`}
          >
            View all
          </Link>
        )}
      </div>
      {isLoading ? (
        <SkelatonLoader />
      ) : isError ? (
        <Error error={String(errorMessage)} classes="h-[250px] text-[18px]" />
      ) : (
        <MoviesSlides movies={movies.results} category={category} />
      )}
    </section>
  );
};

export default Section;
