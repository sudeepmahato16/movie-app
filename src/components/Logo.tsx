import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "./../assets/tmovie.png";

interface logoProps {
  classes?: string;
}

const Logo: React.FC<logoProps> = ({ classes = "" }) => {
  return (
    <Link
      to="/"
      className={`h-[28px] w-[28px] flex flex-row items-center gap-2 ${classes}`}
    >
      <img src={LogoImg} alt="logo" className="h-full" />
      <h3 className="font-semibold text-[18px] text-black dark:text-primary">tMovies</h3>
    </Link>
  );
};

export default Logo;
