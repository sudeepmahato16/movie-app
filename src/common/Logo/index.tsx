import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/svg/tmovie.svg";

interface logoProps {
  className?: string;
  logoColor?: string;
}

const Logo: React.FC<logoProps> = ({
  className = "",
  logoColor = "text-black dark:text-primary",
}) => (
  <Link
    to="/"
    className={`flex flex-row items-center xs:gap-2 gap-[6px] ${className}`}
  >
    <img
      src={logo}
      alt="logo"
      className="sm:h-[28px] h-[24px] sm:w-[28px] w-[24px]"
    />
    <span
      className={`font-semibold sm:text-[18px] text-[16.75px] ${logoColor} `}
    >
      tMovies
    </span>
  </Link>
);

export default Logo;
