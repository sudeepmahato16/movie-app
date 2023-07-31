import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSun } from "react-icons/fi";

import { ThemeMenu, Logo } from "..";
import HeaderNavItem from "./HeaderNavItem";

import { useGlobalContext } from "../../context/globalContext";
import { useTheme } from "../../context/themeContext";
import { maxWidth, textColor } from "../../styles";
import { navLinks } from "../../constants";

const Header = () => {
  const { openMenu, theme, showThemeOptions } = useTheme();
  const { setShowSidebar } = useGlobalContext();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPageNotFound, setIsPageNotFound] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const changeHeaderBg = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", changeHeaderBg);

    return () => {
      window.removeEventListener("scroll", changeHeaderBg);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.split("/").length > 3) {
      setIsPageNotFound(true);
    } else {
      setIsPageNotFound(false);
    }
  }, [location.pathname]);

  return (
    <header
      className={`py-[14.75px] fixed top-0 left-0 w-full z-10 ${
        isActive && (theme === "Dark" ? "header-bg--dark" : "header-bg--light")
      } transition-all duration-50`}
    >
      <nav className={`${maxWidth} flex justify-between flex-row items-center`}>
        <Logo
          logoColor={
            isPageNotFound
              ? "text-black dark:text-primary"
              : !isPageNotFound && isActive
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
                  showBg={isActive}
                />
              );
            })}
          </ul>

          <div className="button relative">
            <button
              name="theme-menu"
              type="button"
              onClick={openMenu}
              id="theme"
              className={`flex items-center justify-center mb-[2px] transition-all duration-100 hover:scale-110 active:scale-75 ${
                isPageNotFound || isActive
                  ? ` ${textColor} dark:hover:text-secColor hover:text-black `
                  : ` dark:hover:text-secColor text-gray-300 `
              } `}
            >
              {theme === "Dark" ? <BsMoonStarsFill /> : <FiSun />}
            </button>
            <AnimatePresence>
              {showThemeOptions && <ThemeMenu />}
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          name="menu"
          className={`inline-block text-[22.75px] md:hidden ${
            isPageNotFound || isActive
              ? `${textColor} dark:hover:text-secColor hover:text-black `
              : ` dark:hover:text-secColor text-secColor`
          } active:scale-75 transition-all duration-300`}
          onClick={() => setShowSidebar(true)}
        >
          <AiOutlineMenu />
        </button>
      </nav>
    </header>
  );
};

export default Header;
