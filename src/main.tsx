import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./context/context";
import { QueryClient, QueryClientProvider } from "react-query";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { tmdbApi } from "./services/TMDB";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ApiProvider api={tmdbApi}>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </ApiProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
