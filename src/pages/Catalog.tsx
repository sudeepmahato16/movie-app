import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { m } from "framer-motion";

import { useGetShowsQuery } from "../services/TMDB";

import {
  MovieCard,
  Search,
  CatalogHeader,
  SkelatonLoader,
} from "./../components";

import { smallMaxWidth } from "./../styles/styles";
import { slideUp, staggerContainer } from "../utils/motion";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<any[]>([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);

  const query = useLocation().search;
  const { category } = useParams();
  const searchParams = new URLSearchParams(query);
  const type = searchParams.get("type") || "popular";
  const searchQuery = searchParams.get("search") || "";

  const { data, isLoading, isFetching } = useGetShowsQuery({
    category,
    page,
    searchQuery,
    type,
  });

  useEffect(() => {
    setPage(1);
    setIsCategoryChanged(true);
  }, [category, searchQuery]);

  useEffect(() => {
    if (isLoading || isFetching) return;

    if (data?.results) {
      if (page > 1) {
        setShows((prev: any) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
        setIsCategoryChanged(false);
      }
    }
  }, [data]);

  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${smallMaxWidth} `}>
        <Search />

        {isLoading || isCategoryChanged ? (
          <SkelatonLoader isMoviesSliderLoader={false} />
        ) : (
          <m.div
            variants={staggerContainer(0.2, 0)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap xs:gap-4 gap-[14px] justify-center"
          >
            {shows?.map((movie: any, index) => (
              <m.div
                variants={slideUp}
                key={index}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard
                  movie={movie}
                  category={String(category)}
                  offset={1000}
                />
              </m.div>
            ))}
          </m.div>
        )}

        {isFetching && !isCategoryChanged ? (
          <SkelatonLoader isMoviesSliderLoader={false} classes="md:pt-8 sm:pt-7 pt-6" />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isFetching}
              className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito lg:my-8 my-7"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Catalog;
