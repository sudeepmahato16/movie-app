import LazyLoad from "react-lazyload";

import { useGetShowsQuery } from "../services/TMDB";

import { Hero, Loader, Section, Error } from "../components";

import { maxWidth } from "./../styles/styles";
import { sections } from "../constants/constants";
import { sectionsType } from "../types";


const Home = () => {
  const { data, isLoading, isError } = useGetShowsQuery({
    category: "movie",
    type: "popular",
    page: 1,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Unable to fetch the movies! " />;
  }

  const popularMovies = data?.results.slice(0, 5);

  return (
    <>
      <Hero movies={popularMovies} />
      <div className={`${maxWidth} lg:mt-12 md:mt-8 sm:mt-6 xs:mt-4 mt-2  `}>
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
