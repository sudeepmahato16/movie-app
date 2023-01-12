import React, { useContext, useState, useEffect } from "react";

const context = React.createContext({
  showThemeOptions: false,
  toogleThemeOptions: () => {},
  showSideBar: false,
  activeTheme: "System",
  setActiveTheme: (newTheme: string) => {},
  setTheme: (newTheme: string | null) => {},
  checkSystemTheme: () => {},
  setShowSideBar: (prevValue: boolean) => {}
});

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [showThemeOptions, setShowThemeOptions] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [theme, setTheme] = useState<null | string>(null);
  const [activeTheme, setActiveTheme] = useState<string>("System");

  const checkSystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  useEffect(() => {
    checkSystemTheme();
  }, []);

  useEffect(() => {
    
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "Light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toogleThemeOptions = () => {
    setShowThemeOptions((prev) => !prev);
  };

  return (
    <context.Provider
      value={{
        showThemeOptions,
        toogleThemeOptions,
        showSideBar,
        activeTheme,
        setActiveTheme,
        setTheme,
        checkSystemTheme,
        setShowSideBar
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(context);
};
