import { Link } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { useGetShowsQuery } from "../services/TMDB";

import { sectionPropsType } from "../types";

import MoviesSlides from "./MoviesSlides";
import { SkelatonLoader } from "./Loader";

const Section = ({
  title,
  category,
  classes,
  type,
  id,
  showSimilarShows,
}: sectionPropsType) => {
  const { data: movies, isLoading } = useGetShowsQuery({
    category,
    type,
    page: 1,
    showSimilarShows,
    id,
  });

  const { theme } = useGlobalContext();
  
  return (
    <section className={`py-6 font-nunito ${classes}`}>
      <div className={`flex flex-row justify-between items-center mb-6`}>
        <h3 className="text-[22.25px] dark:text-gray-50 font-bold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
        <Link
          to={`/${category}?type=${type}`}
          className={`py-1 text-[14px] px-4 rounded-full  ${
            theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
          } dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`}
        >
          View all
        </Link>
      </div>
      {isLoading ? (
        <SkelatonLoader />
      ) : (
        <MoviesSlides movies={movies.results} category={category} />
      )}
    </section>
  );
};

export default Section;
