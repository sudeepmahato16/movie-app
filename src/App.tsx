import { Routes, Route } from "react-router-dom";
import { Catalog, Home, Detail } from "./pages";

import { Header, Footer } from "./components";

const App = () => {
  return (
    <>
      <Header />
      <main>
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
