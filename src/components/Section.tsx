import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context/context";

import { sectionPropsType } from "../types";
import MoviesSlides from "./MoviesSlides";

const Section: React.FC<sectionPropsType> = ({ movies, title, category }) => {
  const { theme } = useGlobalContext();

  return (
    <section className={`py-6 font-nunito`}>
      <div className={`flex flex-row justify-between items-center mb-8`}>
        <h3 className="text-[22.25px] dark:text-gray-50 font-bold relative">
          <span>{title}</span>
          <div className="line" />
        </h3>
        <Link
          to={`/${category}`}
          className={`py-1 text-[14px] px-4 rounded-full  ${
            theme === "Dark" ? "view-all-btn--dark" : "view-all-btn--light"
          } dark:text-gray-300 hover:-translate-y-1 transition-all duration-300`}
        >
          View all
        </Link>
      </div>
      <MoviesSlides movies={movies} category={category}/>
    </section>
  );
};

export default Section;
