import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
//Чтобы пиццы c сервера как-то отобразились надо создать state, их надо сохранять;
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
      fetch('https://63486b690b382d796c7165b7.mockapi.io/items').then(res => {
        return res.json();
      }).then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
      window.scrollTo(0, 0)
    }, []);

  const [isLoading, setIsLoading] = React.useState(true)


  return (
    <div className="container">
        <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
                }
        </div>
    </div>
  )
}

export default Home