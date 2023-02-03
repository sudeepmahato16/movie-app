import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";

import { maxWidth, textColor } from "./../styles/styles";
import { navLinks } from "../constants/constants";

import Logo from "./Logo";
import HeaderNavItem from "./HeaderNavItem";

import { useGlobalContext } from "../context/context";
import Themes from "./Themes";

const Header: React.FC = () => {
  const { toogleThemeOptions, activeTheme, setShowSideBar, theme } =
    useGlobalContext();
    
  const [showBg, setShowBg] = useState<boolean>(false);
  const [isPageNotFound, setIsPageNotFound] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const changeHeaderBg = () => {
      if (window.scrollY > 0) {
        if (!showBg) setShowBg(true);
      } else {
        if (showBg) setShowBg(false);
      }
    };

    window.addEventListener("scroll", changeHeaderBg);

    return () => {
      window.removeEventListener("scroll", changeHeaderBg);
    };
  }, [showBg]);

  useEffect(() => {
    if (location.pathname.split("/").length > 3) {
      setIsPageNotFound(true);
    } else {
      setIsPageNotFound(false);
    }
  }, [location]);

  return (
    <header
      className={`py-[14.75px] fixed top-0 left-0 w-full z-10 ${
        showBg && (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      } transition-all duration-50`}
    >
      <nav className={`${maxWidth} flex justify-between flex-row items-center`}>
        <Logo
          logoColor={
            !isPageNotFound && showBg
              ? "text-black dark:text-primary"
              : "text-primary"
          }
        />

        <div className=" hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link: { title: string; path: string }) => {
              return (
                <HeaderNavItem
                  key={link.title}
                  link={link}
                  isPageNotFound={isPageNotFound}
                  showBg={showBg}
                />
              );
            })}
          </ul>

          <div className="button relative">
            <button
              name="theme-menu"
              type="button"
              onClick={toogleThemeOptions}
              className={`flex items-center justify-center mb-[2px] transition-all text-gray-300 duration-300 hover:scale-110 active:scale-75 ${
                isPageNotFound || showBg
                  ? `${textColor} dark:hover:text-secColor hover:text-black `
                  : ` dark:hover:text-secColor `
              } `}
            >
              {activeTheme === "Dark" ? (
                <BsMoonStarsFill />
              ) : activeTheme === "Light" ? (
                <FiSun />
              ) : (
                <GoDeviceDesktop />
              )}
            </button>
            <Themes />
          </div>
        </div>

        <button
          type="button"
          name="menu"
          className={`inline-block text-[22.75px] md:hidden ${
            isPageNotFound || showBg
              ? `${textColor} dark:hover:text-secColor hover:text-black `
              : ` dark:hover:text-secColor text-secColor`
          } active:scale-75 transition-all duration-300`}
          onClick={() => setShowSideBar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
