import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "./../assets/tmovie.webp";

interface logoProps {
  classes?: string;
}

const Logo: React.FC<logoProps> = ({ classes = "" }) => {
  return (
    <Link
      to="/"
      className={`sm:h-[28px] h-[24px] sm:w-[28px] w-[24px] flex flex-row items-center xs:gap-2 gap-[6px] ${classes}`}
    >
      <img src={LogoImg} alt="logo" className="sm:h-[28px] h-[24px]" />
      <h3 className="font-semibold sm:text-[18px] text-[16.75px] text-black dark:text-primary">tMovies</h3>
    </Link>
  );
};

export default Logo;
