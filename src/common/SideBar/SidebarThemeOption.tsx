import { ImMobile2 } from "react-icons/im";

import { useGlobalContext } from "../../context/globalContext";
import { useTheme } from "../../context/themeContext";

import { listItem, activeListItem } from "../../styles";
import { themeTypes } from "../../types";

const ThemeOption = ({ theme }: { theme: themeTypes }) => {
  const { setActiveTheme, setTheme, activeTheme, checkSystemTheme } =
    useTheme();
  const { setShowSidebar } = useGlobalContext();

  const { title } = theme;

  const changeTheme = () => {
    if (title === "System") {
      checkSystemTheme();
    } else {
      setTheme(title);
    }
    setShowSidebar(false);
    setActiveTheme(title);
  };

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
