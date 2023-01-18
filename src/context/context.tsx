import React, { useContext, useState, useEffect } from "react";
import { API_KEY, ROOT_URL } from "./../utils/config";

const context = React.createContext({
  showThemeOptions: false,
  toogleThemeOptions: () => {},
  showSideBar: false,
  activeTheme: "System",
  setActiveTheme: (newTheme: string) => {},
  setTheme: (newTheme: string) => {},
  checkSystemTheme: () => {},
  setShowSideBar: (prevValue: boolean) => {},
  theme: "",
  getTrailerId: (id: number) => {},
  videoId: '',
  openModal: () => {},
  closeModal: () => {},
  isModalOpen: false
});

interface Props {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const [showThemeOptions, setShowThemeOptions] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");
  const [activeTheme, setActiveTheme] = useState<string>("System");
  const [videoId, setVideoId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoId('');
  }

  const getTrailerId = async (id: number) => {
    try {
      const res = await fetch(
        `${ROOT_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setVideoId(data.results[0].key);
    } catch (error) {
      console.log(error);
    }
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
        theme,
        checkSystemTheme,
        setShowSideBar,
        getTrailerId,
        videoId,
        openModal,
        closeModal,
        isModalOpen
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
