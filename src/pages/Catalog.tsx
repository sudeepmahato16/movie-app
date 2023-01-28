import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useGetShowsQuery } from "../services/TMDB";

import { MovieCard, Search, CatalogHeader, SkelatonLoader } from "./../components";

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
          <motion.div
            variants={staggerContainer(0.2, 0)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 justify-center"
          >
            {shows?.map((movie: any, index) => (
              <motion.div
                variants={slideUp}
                key={index}
                className="flex flex-col gap-4 w-[170px] rounded-lg mb-6"
              >
                <MovieCard
                  movie={movie}
                  category={String(category)}
                  offset={1000}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {isFetching && !isCategoryChanged ? (
          <SkelatonLoader isMoviesSliderLoader={false} classes="pt-8" />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={isFetching}
              className="py-2 px-4 bg-[#ff0000] text-gray-50 rounded-full text-[15.25px] shadow-md hover:-translate-y-1 transition-all duration-300 font-medium font-nunito mt-8 "
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
