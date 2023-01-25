import React, { useEffect } from "react";
import Section from "./Section";

import { moviesType } from "../types";

const TrendingMovies: React.FC<moviesType> = ({ movies, category }) => {

  return (
    <Section
      movies={movies}
      title="Trending movies"
      category={category}
      type="popular"
    />
  );
};

export default TrendingMovies;
