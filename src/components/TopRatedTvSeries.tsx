import Section from "./Section";
import { useFetch } from "./../utils/useFetch";
import SkelatonLoader from "./SkelatonLoader";

const TopRatedSeries = () => {
  const { data, isLoading } = useFetch({
    category: "tv",
    type: "top_rated",
    key: "top-rated-series"
  });

  if (isLoading) return <SkelatonLoader />;

  return <Section movies={data.results} title="Top rated series" category="tv" type="top_rated" />;
};

export default TopRatedSeries;
