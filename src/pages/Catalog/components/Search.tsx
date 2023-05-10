import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoSearch } from "react-icons/go";

const Search = () => {
  const { category } = useParams();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/${category}?search=${search}`);
    setSearch("");
  };

  return (
    <form
      className="text-[14px] lg:py-10 md:pt-9 md:pb-10 sm:pt-8 sm:pb-10  pt-6 pb-8 flex flex-row items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="py-[8px] pl-[20px] pr-[36px]  rounded-full outline-none w-[280px] shadow-md transition-all duration-300 focus:shadow-sm text-[#666] focus:bg-[#ffffff] bg-[#fdfdfd] font-medium dark:bg-[#302d3a] dark:text-primary dark:focus:bg-[#474550]"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={`search ${category === "movie" ? "movies" : "series"}`}
      />
      <button
        type="submit"
        className={`text-[18px] -ml-[32px] text-[#ff0000] z-[1]`}
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default Search;
