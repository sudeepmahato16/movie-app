import { memo } from "react";

const Genre = ({ name }: { name: string }) => {
  return (
    <span
      className={`genre
       md:text-[12.75px] sm:text-[12px] xs:text-[11.75px] text-[10.75px]  sm:py-1 py-[2.75px] sm:px-3 px-[10px] rounded-full dark:text-gray-300`}
    >
      {name}
    </span>
  );
}; 

export default memo(Genre);
