import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";

import { NavLink, useLocation } from "react-router-dom";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";

import { maxWidth } from "./../styles/styles";
import { navLinks, themeOptions } from "../constants/constants";
import { zoomIn } from "./../utils/motion";

import Logo from "./Logo";
import { useGlobalContext } from "../context/context";

const Header: React.FC = () => {
  const {
    toogleThemeOptions,
    showThemeOptions,
    activeTheme,
    setTheme,
    setActiveTheme,
    checkTheme,
    setShowSideBar,
    theme,
  } = useGlobalContext();
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

  const changeTheme = (theme: string) => {
    if (theme === "System") {
      checkTheme();
    } else {
      setTheme(theme);
    }
    setActiveTheme(theme);
    toogleThemeOptions();
  };

  const textColor = "dark:text-secColor text-black";

  return (
    <header
      className={`py-[14.75px] fixed top-0 left-0 w-full z-10 ${
        showBg && (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      } transition-all duration-50`}
    >
      <nav className={`${maxWidth} flex justify-between flex-row items-center`}>
        <Logo showBg={showBg} isHeaderLogo={!isPageNotFound} />
        <div className=" hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link: { title: string; path: string }, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => {
                      return isActive
                        ? `nav-link active ${
                            showBg ? textColor : `text-secColor`
                          }`
                        : `nav-link ${
                            isPageNotFound || showBg
                              ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                              : "text-gray-300 hover:text-secColor"
                          }`;
                    }}
                    end
                  >
                    {link.title}
                  </NavLink>
                </li>
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
            <AnimatePresence>
              {showThemeOptions && (
                <m.ul
                  variants={zoomIn(0.9, 0.2)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  style={{
                    background: `${
                      theme === "Light" ? "#FAFAFA" : "rgba(0,0,0,0.4)"
                    }`,
                  }}
                  className="absolute top-[200%] right-[25%] bg-primary shadow-md backdrop-blur-sm  rounded-md overflow-hidden dark:dark-glass light-glass"
                >
                  {themeOptions.map((option, index) => (
                    <li
                      key={index}
                      className={`hover:bg-gray-200 dark:hover:bg-black transition-all duration-300 ${
                        activeTheme === option.title
                          ? "bg-gray-200 dark:bg-black "
                          : ""
                      }`}
                    >
                      <button
                        name="theme"
                        type="button"
                        className={`flex flex-row items-center gap-3 font-medium py-2 px-4 text-[14px] ${
                          activeTheme === option.title ? `${textColor} ` : ""
                        }`}
                        onClick={() => {
                          changeTheme(option.title);
                        }}
                      >
                        {<option.icon />}
                        <span>{option.title}</span>
                      </button>
                    </li>
                  ))}
                </m.ul>
              )}
            </AnimatePresence>
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
