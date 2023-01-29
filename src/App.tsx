import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";

import { Catalog, Home, Detail } from "./pages";
import {
  Header,
  Footer,
  SideBar,
  Overlay,
  Modal,
  ScrollToTop,
  Loader,
} from "./components";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Overlay />
      <Modal />
      <Header />
      <SideBar />
      <main className="dark:bg-black bg-mainColor lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/:category" element={<Catalog />} />
          </Routes>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
