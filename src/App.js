import { Route, Routes } from "react-router-dom";
import React from "react";

// components
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";

//styles
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} /> {/* route по умолчанию */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
