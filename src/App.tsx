import React from "react";

import { Routes, Route } from "react-router-dom";

import { Catalog, Home, Detail } from "./pages";
import { Header, Footer, SideBar, Overlay, Modal } from "./components";

import 'react-loading-skeleton/dist/skeleton.css'

import "swiper/css";

const App = () => {
  return (
    <>
      <Overlay />
      <Modal />
      <Header />
      <SideBar />
      <main className="dark:bg-black bg-mainColor pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Detail />} />
          <Route path="/:category" element={<Catalog />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
