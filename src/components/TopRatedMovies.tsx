
import Section from "./Section";
import { useFetch } from "./../utils/useFetch";
import SkelatonLoader from "./SkelatonLoader";



const TopRatedMovies = () => {
  
  const { data, isLoading } = useFetch({
    category: "movie",
    type: "top_rated",
    key: "top-rated-movies"
  });

  if (isLoading) return <SkelatonLoader />;

  return <Section movies={data.results} title="Top rated movies" category="movie" type="top_rated"/>;
};

export default TopRatedMovies;
