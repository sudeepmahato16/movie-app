import React from "react";
import LazyLoad from "react-lazyload";
import { useFetch } from "./../utils/useFetch";

import {
  Hero,
  TrendingMovies,
  TopRatedMovies,
  TrendingSeries,
  TopRatedSeries,
} from "../components";

import { maxWidth } from "./../styles/styles";

const Home = () => {
  const { data, isError, error, isLoading, isFetching } = useFetch({
    category: "movie",
    type: "popular",
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const popularMovies = data.results.slice(0, 5);

  return (
    <>
      <Hero movies={popularMovies} />
      <div className={`${maxWidth} mt-12 `}>
        <TrendingMovies movies={data.results} />

        <LazyLoad height={320} once>
          <TopRatedMovies />
        </LazyLoad>

        <LazyLoad height={320} once>
          <TrendingSeries />
        </LazyLoad>

        <LazyLoad height={320} once>
          <TopRatedSeries />
        </LazyLoad>
      </div>
    </>
  );
};

export default Home;
