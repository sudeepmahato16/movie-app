import Section from "./Section";
import { useFetch } from "./../utils/useFetch";
import SkelatonLoader from "./SkelatonLoader";

const TrendingSeries = () => {
  const { data, isLoading } = useFetch({
    category: "tv",
    type: "popular",
    key: "trending-series"
  });

  if (isLoading) return <SkelatonLoader />;

  return <Section movies={data.results} title="Trending series" category="tv" type="popular" />;
};

export default TrendingSeries;
