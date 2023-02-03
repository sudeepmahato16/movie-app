import React, { useCallback } from "react";
import { useGlobalContext } from "../context/context";
import { listItem, activeListItem } from "./../styles/styles";
import { themeTypes } from "./../types.d";
import { ImMobile2 } from "react-icons/im";

const ThemeOption = ({ theme }: { theme: themeTypes }) => {
  const {
    setShowSideBar,
    setActiveTheme,
    setTheme,
    activeTheme,
    checkSystemTheme,
  } = useGlobalContext();

  const { title } = theme;

  const changeTheme = useCallback(() => {
    if (title === "System") {
      checkSystemTheme();
    } else {
      setTheme(title);
    }
    setShowSideBar(false);
    setActiveTheme(title);
  }, [title]);

  return (
    <li>
      <button
        type="button"
        className={`${listItem} ${
          theme.title === activeTheme ? activeListItem : ""
        }`}
        onClick={changeTheme}
      >
        {theme.title === "System" ? <ImMobile2 /> : <theme.icon className="" />}
        <span>{theme.title}</span>
      </button>
    </li>
  );
};

export default ThemeOption;
