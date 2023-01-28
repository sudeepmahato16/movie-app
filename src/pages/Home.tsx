import LazyLoad from "react-lazyload";

import { useGetShowsQuery } from "../services/TMDB";

import { Hero, Loader, Section } from "../components";

import { maxWidth } from "./../styles/styles";
import { sections } from "../constants/constants";
import { sectionsType } from "../types";

const Home = () => {
  const { data, isLoading } = useGetShowsQuery({
    category: "movie",
    type: "popular",
    page: 1,
  });

  if (isLoading) {
    return <Loader />;
  }

  const popularMovies = data?.results.slice(0, 5);

  return (
    <>
      <Hero movies={popularMovies} />
      <div className={`${maxWidth} mt-12 `}>
        {sections.map(({ title, category, type }: sectionsType) => (
          <LazyLoad height={320} once key={title}>
            <Section title={title} category={category} type={type} />
          </LazyLoad>
        ))}
      </div>
    </>
  );
};

export default Home;
