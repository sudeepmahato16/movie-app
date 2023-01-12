import React from "react";

import { NavLink } from "react-router-dom";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";

import { maxWidth } from "./../styles/styles";
import { navLinks, themeOptions } from "../constants/constants";

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
  } = useGlobalContext();

  const changeTheme = (theme: string) => {
    if (theme === "System") {
      checkSystemTheme();
    } else {
      setTheme(theme);
    }
    setActiveTheme(theme);
    toogleThemeOptions();
  };

  return (
    <header className="py-4 fixed top-0 left-0 w-full ">
      <nav className={`${maxWidth} flex justify-between flex-row items-center`}>
        <Logo />
        <div className=" hidden md:flex flex-row gap-8 items-center text-gray-600 ">
          <ul className="flex flex-row gap-8 capitalize text-[14.75px] font-medium">
            {navLinks.map((link: { title: string; path: string }, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => {
                      return isActive ? "nav-link active" : "nav-link";
                    }}
                  >
                    {link.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="button relative">
            <button type="button" onClick={toogleThemeOptions} className="flex items-center justify-center mb-[2px]">
              {activeTheme === "Dark" ? (
                <BsMoonStarsFill />
              ) : activeTheme === "Light" ? (
                <FiSun />
              ) : (
                <GoDeviceDesktop />
              )}
            </button>
            {showThemeOptions && (
              <ul className="absolute top-[150%] right-0 bg-primary shadow-md backdrop-blur-sm  rounded-md overflow-hidden">
                {themeOptions.map((option, index) => (
                  <li
                    key={index}
                    className={`hover:bg-gray-100 transition-all duration-300 ${
                      activeTheme === option.title ? "bg-gray-100" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="flex flex-row items-center gap-3 font-medium py-2 px-4 text-[14px]"
                      onClick={() => {
                        changeTheme(option.title);
                      }}
                    >
                      {<option.icon />}
                      <span>{option.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-block text-[22.75px] md:hidden "
          onClick={() => setShowSideBar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
