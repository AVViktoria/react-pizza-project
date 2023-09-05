import { useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
// import qs from "qs";
import { selectFilter } from "../redux/filter/filterSelectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { selectPizzaData } from "../redux/pizza/pizzaSelectors";

import {
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from "../redux/filter/filterSlice";

// components
import Categories from "../components/Categories";
import Loader from "../components/PizzaBlock/Loader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
// import { list } from "../components/Sort";
import { useAppDispatch } from "../redux/store";
// import { SearchPizzaParams } from "../redux/pizza/pizzaTypes";


const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const isMounted = useRef(false); //первый рендер

  //*     можно записать через деструктуризацию
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  
  const sortType = sort.sortProperty;

  // оборачиваем в коллбек что бы не делалась перерисовка каждый раз
  const onClickCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, [dispatch]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    // backend search
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      //@ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // с помощью этого хука создаем строку с параметрами для передачи в ссылку(URL)
  // если был первый рендер, ссылку не меняем
  // useEffect(() => {
  //   if (isMounted.current) {

  //    const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sortType,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${queryString}`);
  //   }
  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams))
  //   }
  //   const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //   const sort = list.find((obj) => obj.sortProperty === params.sortBy);
   
  //   dispatch(
  //     setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  //     }),
  //   );

  //   // getPizzas();
  //   // isMounted.current = true;
  // }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage] )
  // при первом рендере парсим параметры, проверяем, есть ли в URL такие параметры
  // если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
// useEffect(() => {
// if (window.location.search) {
//       const params = qs.parse(window.location.search.substring(1))as unknown as SearchPizzaParams;
//       const sort = list.find((obj) => obj.sortProperty === params.sortBy);
//   const sortBy = sort ? sort.sortProperty : list[0].sortProperty;
// params.sortBy = sortBy;
  // if (sort) {
  //   params.sortBy = sort;
  // }
  // dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  // }))
  //   }
  //   isMounted.current = true;
  // }, []);

  // если был первый рендер, то запрашиваем пиццы
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   if (!isSearch.current) {
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, currentPage, searchValue]);

  // const pizzas = items
  //   .filter((obj: any) => {
  //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj: any) => (
  //     //* <Link key={obj.id} to= {`/pizza/${obj.id}`}><PizzaBlock  {...obj} /></Link> //link for render one pizza
  //     <div key={obj.id}>
  //       <PizzaBlock {...obj} />
  //     </div>
  //   ));
const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => <Loader key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All Pizzas</h2>
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
