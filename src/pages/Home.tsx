import React from "react";
import { useFetch } from "./../utils/useFetch";

import { Hero } from "../components";

const Home = () => {
  const { data, isError, error, isLoading } = useFetch({
    category: "movie",
    type: "popular",
  });

  if(isLoading){
    return <h1>loading...</h1>
  }

  const popularMovies = data.results.slice(0,5);

  return (
    <>
      <Hero movies={popularMovies}/>
    </>
  );
};

export default Home;
