import { Route, Routes } from "react-router-dom";

// components
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";

//styles
import "./scss/app.scss";

function App() {
  // const pathname = window.location.pathname;
  return (
    <div className="wrapper">
      <Header />
      {/* {isLoading && "Loading..."} */}
      <div className="content">
        {/* {pathname === "/" && <Home />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} /> {/* route по умолчанию */}
        </Routes>
        {/* <NotFound /> */}
      </div>
    </div>
  );
}

export default App;

// {...obj}
// key={title}
// title={title}
// price={price}
// imageUrl={imageUrl}
// sizes={sizes}
// types={types}
