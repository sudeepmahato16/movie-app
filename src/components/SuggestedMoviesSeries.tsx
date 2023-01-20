import React from "react";
import Section from "./Section";
import { useFetch } from "./../utils/useFetch";
import SkelatonLoader from "./SkelatonLoader";
import { maxWidth } from "./../styles/styles";

interface Props {
  category: string;
  id: number;
}

const SuggestedMoviesSeries: React.FC<Props> = ({ category, id }) => {
  const { data, isLoading } = useFetch({
    category,
    key: "similar",
    id,
    getSimilar: true,
  });

  if (isLoading) return <SkelatonLoader classes={`${maxWidth} `} />;

  return (
    <Section
      movies={data.results}
      title={`Similar ${category === "movie" ? "movies" : "series"}`}
      category={category}
      classes={`${maxWidth}`}
    />
  );
};

export default SuggestedMoviesSeries;
