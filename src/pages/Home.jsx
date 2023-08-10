import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Loader from "../components/PizzaBlock/Loader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(555);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.sortProperty.replace("-", '');
    const order = sortType.sortProperty.includes("-") ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    fetch(
      `https://64b78c1321b9aa6eb0784a2e.mockapi.io/items?${
        category
      }&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(indexItem) => setCategoryId(indexItem)}
        />
        <Sort
          value={sortType}
          onChangeSort={(indexItem) => setSortType(indexItem)}
        />
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
  );
};

export default Home;
