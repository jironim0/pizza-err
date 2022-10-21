import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

import { setCategoryId } from '../redux/slices/filterSlice'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination/index'
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch(); 
  const {categoryId, sort} = useSelector(state => state.filter);
  const sortType = sort.sortProperty



  const {searchValue} = React.useContext(SearchContext)
  //Чтобы пиццы c сервера как-то отобразились надо создать state, их надо сохранять;
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //skeleton
  const [currentPage, setCurrentPage] = React.useState(1); //pagination



  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }



  React.useEffect(() => {
    setIsLoading(true);
    axios.get(`https://63486b690b382d796c7165b7.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""}&sortBy=${sortType.sortProperty}&order=desc`).then(res => {
      setItems(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items
              .filter((obj) => {
                if (
                  obj.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
