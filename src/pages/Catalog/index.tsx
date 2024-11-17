import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";


import { MovieCard, SkelatonLoader } from "@/common";
import { CatalogHeader, Search } from "./components";
import { useGetShowsQuery } from "@/services/TMDB";
import { smallMaxWidth } from "@/styles";
import { IMovie } from "@/types";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<IMovie[]>([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState<boolean>(false);
  const [query, setQuery] = useSearchParams();
  const { category } = useParams();

  const type = query.get("type") || "popular";
  const searchQuery = query.get("search") || "";

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
        setShows((prev) => [...prev, ...data.results]);
      } else {
        setShows([...data.results]);
        setIsCategoryChanged(false);
      }
    }
  }, [data, isFetching, isLoading, page]);

  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${smallMaxWidth} `}>
        <Search setQuery={setQuery}/>

        {isLoading || isCategoryChanged ? (
          <SkelatonLoader isMoviesSliderLoader={false} />
        ) : (
          <div
          
            className="flex flex-wrap xs:gap-4 gap-[14px] justify-center"
          >
            {shows?.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col xs:gap-4 gap-2 xs:max-w-[170px] max-w-[124px] rounded-lg lg:mb-6 md:mb-5 sm:mb-4 mb-[10px]"
              >
                <MovieCard movie={movie} category={String(category)} />
              </div>
            ))}
          </div>
        )}

        {isFetching && !isCategoryChanged ? (
          <div className="my-4">
            <FiLoader className="mx-auto dark:text-gray-300 w-5 h-5 animate-spin"/>
          </div>
 
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isFetching}
              className="sm:py-2 xs:py-[6px] py-1 sm:px-4 xs:px-3 px-[10.75px] bg-[#ff0000] text-gray-50 rounded-full md:text-[15.25px] sm:text-[14.75px] xs:text-[14px] text-[12.75px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito my-4"
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
