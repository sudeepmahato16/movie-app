import React from "react";
import { useGlobalContext } from "../context/context";

const Genre = ({ name }: { name: string }) => {
  const { theme } = useGlobalContext();
  return (
    <span className={`${theme === "Dark" ? "genre--dark" : "genre--light"} text-[12.75px] py-1 px-3 rounded-full dark:text-gray-300`}>
      {name}
    </span>
  );
};

export default Genre;
