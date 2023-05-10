import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { tmdbApi } from "./services/TMDB";
import GlobalContextProvider from "./store";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={tmdbApi}>
        <GlobalContextProvider>
          <LazyMotion features={domAnimation}>
            <App />
          </LazyMotion>
        </GlobalContextProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
