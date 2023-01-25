import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { showTypes } from "../types";
import { API_KEY, TMDB_API_BASE_URL } from "../utils/config";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),
  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({ category, type, searchQuery, page }: showTypes) => {
        if (searchQuery) {
          return `search/${category}?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
        }
        return `${category}/${type}?api_key=${API_KEY}&page=${page}`;
      },
    }),

    getSimilarShows: builder.query({
      query: ({ category, id }) =>
        `${category}/${id}/similar?api_key=${API_KEY}`,
    }),

    getMovie: builder.query({
      query: ({ category, id }) =>
        `${category}/${id}?append_to_response=videos,credits&api_key=${API_KEY}`,
    }),
  }),
});

export const { useGetShowsQuery, useGetMovieQuery, useGetSimilarShowsQuery } =
  tmdbApi;
