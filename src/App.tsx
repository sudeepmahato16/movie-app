import React from "react";

import { Routes, Route } from "react-router-dom";

import { Catalog, Home, Detail } from "./pages";
import { Header, Footer, SideBar, Overlay } from "./components";
import { maxWidth } from "./styles/styles";

const App = () => {
  return (
    <>
      <Overlay />
      <Header />
      <SideBar />
      <main className={`${maxWidth}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Detail />} />
          <Route path="/:category" element={<Catalog />} />
          <Route path="/:category/search/:search" element={<Catalog />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
