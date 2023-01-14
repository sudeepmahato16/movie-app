import { useQuery } from "react-query";
import { fetchPropsType } from "./../types.d";
import { API_KEY, ROOT_URL } from "./config";

export const useFetch = ({ category, type }: fetchPropsType) => {
  return useQuery(category, async () => {
    try {
      const res = await fetch(
        `${ROOT_URL}/${category}/${type}?api_key=${API_KEY}&language=en-US&page=1`
      );
      if (res.status === 404) throw new Error("Something went wrong!");
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  });
};
