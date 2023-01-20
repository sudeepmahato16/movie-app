import { useQuery } from "react-query";
import { fetchPropsType } from "./../types.d";
import { API_KEY, ROOT_URL } from "./config";

export const useFetch = ({
  category,
  type,
  getDetail,
  id,
  getCredits,
  key,
  getVideo,
  getSimilar,
}: fetchPropsType) => {
  return useQuery(
    key,
    async () => {
      try {
        let url;
        if (getDetail) {
          url = `${ROOT_URL}/${category}/${id}?api_key=${API_KEY}&language=en-US`;
        } else if (getCredits) {
          url = `${ROOT_URL}/${category}/${id}/credits?api_key=${API_KEY}&language=en-US`;
        } else if (getVideo) {
          url = `${ROOT_URL}/${category}/${id}/videos?api_key=${API_KEY}&language=en-US`;
        } else if (getSimilar) {
          url = `${ROOT_URL}/${category}/${id}/similar?api_key=${API_KEY}&language=en-US`;
        } else {
          url = `${ROOT_URL}/${category}/${type}?api_key=${API_KEY}&language=en-US&page=1`;
        }

        const res = await fetch(url);
        if (res.status === 404) throw new Error("Something went wrong!");
        return await res.json();
      } catch (error: any) {
        console.log(error.message);
      }
    },
    {
      staleTime: 4000,
    }
  );
};
