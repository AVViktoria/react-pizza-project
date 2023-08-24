import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { SearchContext } from "../App";
import qs from "qs";

// components
import Categories from "../components/Categories";
import Loader from "../components/PizzaBlock/Loader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { list } from "../components/Sort";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false); //первый рендер
  // const categoryId = useSelector(state => state.filter.categoryId);
  // const sortType = useSelector(state => state.filter.sort.sortProperty);
  //*     можно записать через деструктуризацию
  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);



  const sortType = sort.sortProperty;
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    // backend search
    const search = searchValue ? `&search=${searchValue}` : "";

    //* переписали функцию на синхронную async/await with try/catch

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // с помощью этого хука создаем строку с параметрами для передачи в ссылку(URL)
  // если был первый рендер, ссылку не меняем
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // при первом рендере парсим параметры, проверяем, есть ли в URL такие параметры
  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

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
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            An error has occurred <span>😕</span>
          </h2>
          <p>Unable to get pizzas, sorry! Try again later...</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
