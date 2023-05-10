import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

import {
  Header,
  Footer,
  SideBar,
  Overlay,
  Modal,
  ScrollToTop,
  Loader,
} from "./common";

import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";

const App = () => {
  return (
    <>
      <Overlay />
      <Modal />
      <SideBar />
      <Header />
      <main className="dark:bg-black bg-mainColor lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/:category/:id"
              element={
                <Suspense fallback={<Loader />}>
                  <Detail />
                </Suspense>
              }
            />
            <Route
              path="/:category"
              element={
                <Suspense fallback={<Loader />}>
                  <Catalog />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
