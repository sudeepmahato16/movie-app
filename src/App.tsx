import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import { Adsense } from "@ctrl/react-adsense";

import {
  Header,
  Footer,
  SideBar,
  VideoModal,
  ScrollToTop,
  Loader,
} from "@/common";

import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_AD_CLIENT,
  GOOGLE_AD_SLOT,
} from "./utils/config";

const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  useEffect(() => {
    if(!GA_MEASUREMENT_ID) return;
    ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send("pageview");
  }, []);

  return (
    <>
      <VideoModal />
      <SideBar />
      <Header />
      <main className=" lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
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

      <Adsense
        client={GOOGLE_AD_CLIENT || ""}
        slot={GOOGLE_AD_SLOT || ""}
        style={{ display: "block" }}
        format="auto"
        responsive="true"
      />
      <Footer />
    </>
  );
};

export default App;
