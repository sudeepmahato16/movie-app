import React from "react";
import Section from "./Section";

import { moviesType } from "../types";

const TrendingMovies: React.FC<moviesType> = ({ movies }) => {
  return <Section movies={movies} title="Trending movies" category="movie" />;
};

export default TrendingMovies;
