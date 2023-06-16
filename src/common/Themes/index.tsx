import { memo, useRef, useEffect } from "react";
import { m } from "framer-motion";

import { useTheme } from "../../context/themeContext";
import { zoomIn } from "../../utils/motion";
import { themeOptions } from "../../constants";
import { textColor } from "../../styles";

const Themes = () => {
  const ref = useRef<null | HTMLUListElement>(null);

  const {
    theme,
    setTheme,
    checkSystemTheme,
    setActiveTheme,
    activeTheme,
    setShowThemeOptions,
  } = useTheme();

  const changeTheme = (theme: string) => {
    if (theme === "System") {
      checkSystemTheme();
    } else {
      setTheme(theme);
    }

    setActiveTheme(theme);
    setShowThemeOptions(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const el = ref.current;

      if (
        !(
          (el && el.contains(target)) ||
          document.getElementById("theme")?.contains(target)
        )
      ) {
        setShowThemeOptions(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [setShowThemeOptions]);

  return (
    <m.ul
      ref={ref}
      variants={zoomIn(0.9, 0.2)}
      initial="hidden"
      animate="show"
      exit="hidden"
      style={{
        background: `${theme === "Light" ? "#FAFAFA" : "rgba(0,0,0,0.4)"}`,
      }}
      className="absolute top-[200%] right-[25%] bg-primary shadow-md backdrop-blur-sm  rounded-md overflow-hidden dark:dark-glass light-glass"
    >
      {themeOptions.map((option, index) => (
        <li
          key={index}
          className={`hover:bg-gray-200 dark:hover:bg-black transition-all duration-300 ${
            activeTheme === option.title ? "bg-gray-200 dark:bg-black " : ""
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
  );
};

export default memo(Themes);
