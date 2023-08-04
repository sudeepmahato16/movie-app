import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Header,
  Footer,
  SideBar,
  VideoModal,
  ScrollToTop,
  Loader,
} from "./common";

import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import Cursor from "./styles/cursor/Cursor";

const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <>
      <div>
        <Cursor />
      </div>
      <VideoModal />
      <SideBar />
      <Header />
      <main className="dark:bg-black bg-mainColor lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category/:id" element={<Detail />} />
              <Route path="/:category" element={<Catalog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
