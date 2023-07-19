import { useEffect, useState } from "react";

import Header from "./components/Header.jsx";
import Sort from "./components/Sort.jsx";
import Categories from "./components/Categories.jsx";
import PizzaBlock from "./components/PizzaBlock";

import "./scss/app.scss";
// import pizzas from "./assets/pizzas.json";
// const pizzas = [];

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://64b78c1321b9aa6eb0784a2e.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);
  console.log(items);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                // key={title}
                // title={title}
                // price={price}
                // imageUrl={imageUrl}
                // sizes={sizes}
                // types={types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
