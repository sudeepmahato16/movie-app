import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./context/context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
