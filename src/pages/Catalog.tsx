import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useInfiniteQuery } from 'react-query';

import CatalogHeader from "../components/CatalogHeader";
import { maxWidth } from './../styles/styles';

const Catalog = () => {
  const query = useLocation().search;
  const { category } = useParams();
  const type = new URLSearchParams(query).get("type");
  const search = new URLSearchParams(query).get("search");


  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery('projects', fetchProjects, {
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  // })

  return (
    <>
      <CatalogHeader category={String(category)} />
      <section className={`${maxWidth} `}>
      <h2>Search</h2>
      <div>

      </div>
      </section>

    </>
  );
};

export default Catalog;
