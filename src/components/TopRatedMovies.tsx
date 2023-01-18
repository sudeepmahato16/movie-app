
import Section from "./Section";
import { useFetch } from "./../utils/useFetch";
import SkelatonLoader from "./SkelatonLoader";



const TopRatedMovies = () => {
  
  const { data, isLoading } = useFetch({
    category: "movie",
    type: "top_rated",
  });

  if (isLoading) return <SkelatonLoader />;

  return <Section movies={data.results} title="Top rated movies" category="movie"/>;
};

export default TopRatedMovies;
