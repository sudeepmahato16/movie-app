import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { NavLink } from "react-router-dom";
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
    checkSystemTheme,
    setShowSideBar,
    theme,
  } = useGlobalContext();
  const [showBg, setShowBg] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollY = setInterval(() => {
      if (window.scrollY > 0) {
        if (!showBg) setShowBg(true);
      } else {
        if (showBg) setShowBg(false);
      }
    }, 0);

    return () => {
      clearInterval(checkScrollY);
    };
  }, [showBg]);

  const changeTheme = (theme: string) => {
    if (theme === "System") {
      checkSystemTheme();
    } else {
      setTheme(theme);
    }
    setActiveTheme(theme);
    toogleThemeOptions();
  };

  const textColor = "dark:text-secColor text-black";
  // const textColor = theme === "Dark" ? "text-secColor" : "text-black";

  return (
    <header
      className={`py-4 fixed top-0 left-0 w-full z-10 ${
        showBg && (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      } transition-all duration-300`}
    >
      <nav className={`${maxWidth} flex justify-between flex-row items-center`}>
        <Logo />
        <div className=" hidden md:flex flex-row gap-8 items-center text-gray-600 dark:text-gray-300">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link: { title: string; path: string }, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    theme === "Dark"
                      ? "hover:text-secColor"
                      : "hover:text-black"
                  }`}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => {
                      return isActive
                        ? `nav-link active ${textColor}`
                        : "nav-link ;";
                    }}
                  >
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="button relative">
            <button
              type="button"
              onClick={toogleThemeOptions}
              className={`flex items-center justify-center mb-[2px] dark:hover:text-secColor hover:text-black transition-all duration-300`}
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
                <motion.ul
                  variants={zoomIn(0.9, 0.2)}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  style={{
                    background: `${
                      theme === "Light" ? "#FAFAFA" : "rgba(0,0,0,0.4)"
                    }`,
                  }}
                  className="absolute top-[200%] right-0 bg-primary shadow-md backdrop-blur-sm  rounded-md overflow-hidden dark:dark-glass light-glass"
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
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          className={`inline-block text-[22.75px] md:hidden ${textColor}`}
          onClick={() => setShowSideBar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
