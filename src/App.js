// import React from "react";
import axios from "axios";
import React from "react";
import { Route } from "react-router-dom";
import Drawer from "./component/Drawer";
import Header from "./component/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {

  const [items, setItems] = React.useState([]); // хук для карточек с кроссовками
  const [cartItems, setCartItems] = React.useState([]); // хук для товаров в корзине
  const [favorites, setFavorites] = React.useState([]); // хук для товаров в избранное
  const [searchValue, setSearchValue] = React.useState(''); // хук для поиска товаров
  const [cartOpened, setCartOpened] = React.useState(false) // хук для открытия / закрытия корзины

  React.useEffect(() => { // этот хук следит, если открыта корзина, убираем глобальный скролл
    const body = document.querySelector('body');
    body.style.overflow = cartOpened ? 'hidden' : 'auto';
  }, [cartOpened]);

  React.useEffect(() => { // оборачиваем запрос хуком "useEffect", чтобы рендер произошел только один раз, при первой загрузке страницы
    axios.get('https://6147374665467e0017384aa5.mockapi.io/items') // то же самое, что и "fetch"
      .then(res => setItems(res.data));

    axios.get('https://6147374665467e0017384aa5.mockapi.io/cart') // запрашиваем "cart" с сервера и рендерим корзину
      .then(res => setCartItems(res.data));

    axios.get('https://6147374665467e0017384aa5.mockapi.io/favorites') // запрашиваем "cart" с сервера и рендерим корзину
      .then(res => setFavorites(res.data));
  }, []);

  const onAddToCart = (obj) => { // когда произойдет клик в "Card", хук "setCartItems" запушит в массив новый "obj"
    axios.post('https://6147374665467e0017384aa5.mockapi.io/cart', obj) // при добавлении товара в корзину отправить "obj" на сервер
    setCartItems(prev => [...prev, obj])
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) { // если в стайте "favorites" есть объект с "id" таким же как у объекта по которому совершили клик
        axios.delete(`https://6147374665467e0017384aa5.mockapi.io/favorites/${obj.id}`);// отправь запрос на удаление
        // setFavorites(prev => prev.filter(item => item.id !== obj.id))// перебрать стэйт и убрать из него объект, "id" которого, равен "obj.id"
      } else {
        const { data } = await axios.post('https://6147374665467e0017384aa5.mockapi.io/favorites', obj)// дождись ответа
        setFavorites(prev => [...prev, data])
      }
    } catch (error){
      alert('Не удалось добавить в фавориты')
    }
  }

  const omRemoveItem = (id) => {
    axios.delete(`https://6147374665467e0017384aa5.mockapi.io/cart/${id}`) // при удалении товара , удалить с сервера
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => { // елси input изменится, отловить событие, и обновить state
    setSearchValue(event.target.value)
  }


  return (
    <div className="wrapper clear">
      {
        cartOpened && <Drawer //если "cartOpened" === true, то произвести рендер корзины
          onRemove={omRemoveItem}
          onClose={() => setCartOpened(false)}
          items={cartItems} />
      }
      <Header onClickCart={() => setCartOpened(true)} />

      <Route path="/" exact>
        <Home
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          items={items}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites
          onAddToFavorite={onAddToFavorite}
          items={favorites} />
      </Route>


    </div>
  )
}

export default App;
