import { useEffect, useState } from "react"

import Categories from "../components/Categories"
import Loader from "../components/PizzaBlock/Loader"
import PizzaBlock from "../components/PizzaBlock/PizzaBlock"
import Sort from "../components/Sort"

const Home = ()=> {
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

  return(
    <>
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
    </>
  )

  
}

 export default Home;