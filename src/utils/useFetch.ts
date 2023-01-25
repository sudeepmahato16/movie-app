// import { useQuery } from "react-query";
import { fetchPropsType } from "./../types.d";
import { API_KEY, TMDB_API_BASE_URL } from "./config";
import { useCallback } from "react";

// export const useFetch = ({
//   category,
//   type,
//   getDetail,
//   id,
//   getCredits,
//   key,
//   getVideo,
//   getSimilar,
// }: fetchPropsType) => {
//   return useQuery(
//     key,
//     useCallback(async () => {
//       try {
//         let url;
//         if (getDetail) {
//           url = `${TMDB_API_BASE_URL}/${category}/${id}?api_key=${API_KEY}&language=en-US`;
//         } else if (getCredits) {
//           url = `${TMDB_API_BASE_URL}/${category}/${id}/credits?api_key=${API_KEY}&language=en-US`;
//         } else if (getVideo) {
//           url = `${TMDB_API_BASE_URL}/${category}/${id}/videos?api_key=${API_KEY}&language=en-US`;
//         } else if (getSimilar) {
//           url = `${TMDB_API_BASE_URL}/${category}/${id}/similar?api_key=${API_KEY}&language=en-US`;
//         } else {
//           url = `${TMDB_API_BASE_URL}/${category}/${type}?api_key=${API_KEY}&language=en-US&page=1`;
//         }

//         const res = await fetch(url);
//         if (res.status === 404) throw new Error("Something went wrong!");
//         return await res.json();
//       } catch (error: any) {
//         console.log(error.message);
//       }
//     }, [id, category, getVideo, getSimilar, type, getCredits]),
//     {
//       staleTime: 40000,
//     }
//   );
// }

import { useQuery } from "react-query";
import axios from "axios";

const buildUrl = (
  category: string,
  id: number | null,
  type: string | null,
  getDetail: boolean | null,
  getCredits: boolean | null,
  getVideo: boolean | null,
  getSimilar: boolean | null
) => {
  let url;
  switch (true) {
    case getDetail:
      url = `${TMDB_API_BASE_URL}/${category}/${id}?api_key=${API_KEY}&language=en-US`;
      break;
    case getCredits:
      url = `${TMDB_API_BASE_URL}/${category}/${id}/credits?api_key=${API_KEY}&language=en-US`;
      break;
    case getVideo:
      url = `${TMDB_API_BASE_URL}/${category}/${id}/videos?api_key=${API_KEY}&language=en-US`;
      break;
    case getSimilar:
      url = `${TMDB_API_BASE_URL}/${category}/${id}/similar?api_key=${API_KEY}&language=en-US`;
      break;
    default:
      url = `${TMDB_API_BASE_URL}/${category}/${type}?api_key=${API_KEY}&language=en-US&page=1`;
  }
  return url;
};

export const useFetch = ({
  category,
  type = "",
  getDetail = false,
  id = 1,
  getCredits = false,
  getVideo = false,
  getSimilar = false,
}: fetchPropsType) => {
  const key = [
    category,
    type,
    getDetail,
    id,
    getCredits,
    getVideo,
    getSimilar,
  ].join("-");
  return useQuery(
    key,
    async () => {
      const url = buildUrl(
        category,
        id,
        type,
        getDetail,
        getCredits,
        getVideo,
        getSimilar
      );
      try {
        const res = await axios.get(url);
        return res.data;
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
    {
      staleTime: 40000,
      retry: 2,
    }
  );
};
