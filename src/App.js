import { Outlet, Route, Routes } from "react-router-dom";
import React from "react";

// components
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import FullPizza from "./pages/FullPizza.jsx";
//styles
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout.jsx";

// function Parent({children}) {
//   return (
//     <div>
//       <h1>Label</h1>
//       {children;}// we can use it if no many routers
//       <Outlet />
//     </div>
//   );
// }
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} /> {/* route по умолчанию */}
      </Route>
    </Routes>
  );
}

export default App;
