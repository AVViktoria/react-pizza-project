import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";



import Categories from "../components/Categories";
import Loader from "../components/PizzaBlock/Loader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  // const categoryId = useSelector(state => state.filter.categoryId);
  // const sortType = useSelector(state => state.filter.sort.sortProperty);
      
  //можно записать через диструктуризацию
  const {categoryId, sort} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue} = useContext(SearchContext); // use hook useContext
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id))
}
  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
   
    // backend search
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://64b78c1321b9aa6eb0784a2e.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => <Loader key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onClickCategory}
        />
        <Sort
          
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzas}

        {/* {items.map((obj) =>
              isLoading ? <Skeleton /> : <PizzaBlock key={obj.id} {...obj} />
            )} */}
      </div>
      <Pagination onChangePage={number=>setCurrentPage(number) } />
    </div>
  );
};

export default Home;