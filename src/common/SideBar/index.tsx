import React from "react";
import { AnimatePresence, m } from "framer-motion";

import SidebarNavItem from "./SidebarNavItem";
import ThemeOption from "./SidebarThemeOption";
import Logo from "../Logo";

import { useGlobalContext } from "../../context/globalContext";
import { useTheme } from "../../context/themeContext";

import { navLinks, themeOptions } from "../../constants";
import { sideBarHeading } from "../../styles";
import { navLinkType, themeTypes } from "../../types";
import { slideIn } from "../../utils/motion";

const SideBar: React.FC = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  const { theme } = useTheme();

  const closeSideBar = () => {
    setShowSidebar(false);
  };

  return (
    <AnimatePresence>
      {showSidebar && (
        <m.nav
          variants={slideIn("right", "tween", 0, 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className={`fixed top-0 right-0 sm:w-[40%] xs:w-[220px] w-[195px] h-screen z-20 overflow-y-scroll ${
            theme === "Dark" ? "dark-glass" : "light-glass"
          } shadow-md md:hidden p-4 transition-all duration-300 ease-in dark:text-gray-200 text-gray-600`}
        >
          <div className="flex items-center justify-center  ">
            <Logo />
          </div>

          <div className="p-4 sm:pt-8  xs:pt-6 pt-[22px] h-full flex flex-col">
            <h3 className={sideBarHeading}>Menu</h3>
            <ul className="flex flex-col sm:gap-2 xs:gap-[6px] gap-1 capitalize xs:text-[14px] text-[13.5px] font-medium">
              {navLinks.map((link: navLinkType) => {
                return (
                  <SidebarNavItem
                    link={link}
                    closeSideBar={closeSideBar}
                    key={link.title.replaceAll(" ", "")}
                  />
                );
              })}
            </ul>

            <h3 className={`${sideBarHeading} mt-4 `}>Theme</h3>
            <ul className="flex flex-col sm:gap-2 xs:gap-[4px] gap-[2px] capitalize text-[14.75px] font-medium">
              {themeOptions.map((theme: themeTypes) => {
                return <ThemeOption theme={theme} key={theme.title} />;
              })}
            </ul>

            <p className="xs:text-[12px] text-[11.75px] mt-auto sm:mb-6 mb-[20px] text-center font-nunito dark:text-gray-200">
              &copy; 2023 by tMovies. All right reserved.
            </p>
          </div>
        </m.nav>
      )}{" "}
    </AnimatePresence>
  );
};

export default SideBar;
