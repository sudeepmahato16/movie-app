
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { ImMobile2 } from "react-icons/im";

import { useGlobalContext } from "../context/context";

import { navLinks, themeOptions } from "../constants/constants";
import { activeListItem, listItem, sideBarHeading } from "../styles/styles";
import { navLinkType, themeTypes } from "../types";
import Logo from "./Logo";

const SideBar = () => {
  const {
    showSideBar,
    setShowSideBar,
    setActiveTheme,
    setTheme,
    theme,
    activeTheme,
  } = useGlobalContext();

  return (
    <aside
      className={`fixed top-0 right-0 w-[40%] h-screen z-10 ${
        theme === "Dark" ? "dark-glass" : "light-glass"
      } shadow-md md:hidden drop-shadow-sm p-4 transition-all duration-300 ease-in ${
        showSideBar ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      } dark:text-navColor text-gray-600`}
    >
      <div className="flex  items-center w-full ">
        <div className="flex-1 flex justify-center relative">
          <Logo classes="-translate-x-[50%] mr-[32px]" />
        </div>
        <button
          type="button"
          className={`flex justify-center items-center h-[32px] w-[32px] transition-all duration-300 rounded-full hover:bg-[rgba(256,256,256)] hover:bg-opacity-30 dark:hover:bg-blackOverlay text-[22.75px] md:hidden dark:text-gray-400 text-gray-600`}
          onClick={() => setShowSideBar(false)}
        >
          <IoMdClose />
        </button>
      </div>
      <div className="p-4 pt-8 h-full flex flex-col">
        <h3 className={sideBarHeading}>Menu</h3>
        <ul className="flex flex-col gap-2 capitalize text-[14px] font-medium">
          {navLinks.map((link: navLinkType, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => {
                    return isActive
                      ? `${listItem} ${activeListItem}`
                      : `${listItem}`;
                  }}
                  onClick={() => setShowSideBar(false)}
                >
                  {<link.icon className="text-[18px]" />}
                  <span>{link.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <h3 className={`${sideBarHeading} mt-6 `}>Theme</h3>
        <ul className="flex flex-col gap-2 capitalize text-[14px] font-medium">
          {themeOptions.map((theme: themeTypes, index) => {
            return (
              <li key={index}>
                <button
                  type="button"
                  className={`${listItem} ${
                    theme.title === activeTheme ? activeListItem : ""
                  }`}
                  onClick={() => {
                    setShowSideBar(false);
                    setActiveTheme(theme.title);
                    setTheme(theme.title);
                  }}
                >
                  {theme.title === "System" ? (
                    <ImMobile2 />
                  ) : (
                    <theme.icon className="" />
                  )}
                  <span>{theme.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="text-[12px] mt-auto mb-4 dark:text-gray-400">
          &copy; 2023 by tMovies. All right reserved.
        </p>
      </div>
    </aside>
  );
};

export default SideBar;
