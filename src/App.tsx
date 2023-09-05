import { Route, Routes } from "react-router-dom";
import Loadable from 'react-loadable';
// components
import Home from "./pages/Home";

//styles
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import { Suspense, lazy } from "react";

// разделение кода делает только на стороне браузера
// loadable делает также на стороне браузера
const Cart = Loadable({
  loader: () => import('./pages/Cart'),
  loading: () => <div>Is loading...</div>,
});

const FullPizza = lazy(() => import('./pages/FullPizza'));
const NotFound = lazy(() => import('./pages/NotFound'));




function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Suspense fallback = {<div>Cart is Loading</div>}>
          <Cart />
        </Suspense>} />
        <Route path="pizza/:id" element={<Suspense fallback = {<div>Is Loading</div>}>
          <FullPizza />
        </Suspense>} />
        <Route path="*" element={
          <Suspense fallback = {<div>Is Loading</div>}>
          <NotFound />
        </Suspense>} /> {/* route по умолчанию */}
      </Route>
    </Routes>
  );
}

export default App;
