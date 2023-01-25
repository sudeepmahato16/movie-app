import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { motion } from "framer-motion";

import CatalogHeader from "../components/CatalogHeader";
import MovieCard from "../components/MovieCard";

import { smallMaxWidth } from "./../styles/styles";
import { API_KEY } from "../utils/config";
import { TMDB_API_BASE_URL } from "./../utils/config";
import { slideUp, staggerContainer } from "../utils/motion";
import { SkeletonTheme } from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import { useGlobalContext } from "../context/context";

const Catalog = () => {
  const [page, setPage] = useState(1);
  const query = useLocation().search;
  const { category } = useParams();

  const searchParams = new URLSearchParams(query);
  const type = searchParams.get("type") || "popular";
  const search = searchParams.get("search");



  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${TMDB_API_BASE_URL}/${category}/${type}?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    );

    return await res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(`${category}'s`, fetchData, {
    getNextPageParam: (_lastPage, _pages) => page + 1,
  });

  const { theme } = useGlobalContext();

  const isThemeLight = theme === "Light";

  const Loader = () => {
    return (
      <SkeletonTheme
        baseColor={isThemeLight ? "#f5f5f5" : "#333"}
        highlightColor={isThemeLight ? "#eee" : "#444"}
      >
        <div className="flex flex-row flex-wrap items-center gap-4 justify-center">
          {Array.from({ length: 20}).map(
            (_item, index) => {
              return (
                <div key={index}>
                  <Skeleton height={250} width={170} />
                  <div className="text-center">
                    <Skeleton className="mt-4 w-[80%] " />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </SkeletonTheme>
    );
  };

  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${smallMaxWidth} `}>
        <h2>Search</h2>
        {status === "loading" ? (
          <Loader />
        ) : (
          <motion.div
            variants={staggerContainer(0.2, 0)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4 justify-center"
          >
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((movie: any) => (
                  <motion.div
                    variants={slideUp}
                    key={movie.id}
                    className="flex flex-col gap-4 w-[170px] rounded-lg mb-6"
                  >
                    <MovieCard movie={movie} category={String(category)}  offset={1000}/>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        )}

        {isFetching && !isFetchingNextPage ? (
          <Loader />
        ) : (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setPage(page + 1);
                fetchNextPage();
              }}
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
