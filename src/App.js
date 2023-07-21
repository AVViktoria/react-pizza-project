import { useEffect, useState } from "react";

// components
import Header from "./components/Header.jsx";
import Sort from "./components/Sort.jsx";
import Categories from "./components/Categories.jsx";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock.jsx";
//styles
import "./scss/app.scss";
import Loader from "./components/PizzaBlock";
// import pizzas from "./assets/pizzas.json";
// const pizzas = [];

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://64b78c1321b9aa6eb0784a2e.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
  // console.log(items);

  return (
    <div className="wrapper">
      <Header />
      {/* {isLoading && "Loading..."} */}
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Loader key={index} />)
              : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}

            {/* {items.map((obj) =>
              isLoading ? <Skeleton /> : <PizzaBlock key={obj.id} {...obj} />
            )} */}
          </div>
        </div>
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
