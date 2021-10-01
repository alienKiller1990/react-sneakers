import axios from "axios";
import React from "react";
import { Route } from "react-router-dom";
import Drawer from "./component/Drawer";
import Header from "./component/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {

  const [items, setItems] = React.useState([]); // хук для карточек с кроссовками
  const [cartItems, setCartItems] = React.useState([]); // хук для товаров в корзине
  const [favorites, setFavorites] = React.useState([]); // хук для товаров в избранное
  const [searchValue, setSearchValue] = React.useState(''); // хук для поиска товаров
  const [cartOpened, setCartOpened] = React.useState(false) // хук для открытия / закрытия корзины
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => { // этот хук следит, если открыта корзина, убираем глобальный скролл
    const body = document.querySelector('body');
    body.style.overflow = cartOpened ? 'hidden' : 'auto';
  }, [cartOpened]);

  React.useEffect(() => { // оборачиваем запрос хуком "useEffect", чтобы рендер произошел только один раз, при первой загрузке страницы

    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://6147374665467e0017384aa5.mockapi.io/cart'),
          axios.get('https://6147374665467e0017384aa5.mockapi.io/favorites'),
          axios.get('https://6147374665467e0017384aa5.mockapi.io/items')
        ])
        // const cartResponse = await axios.get('https://6147374665467e0017384aa5.mockapi.io/cart');
        // const favoritesResponse = await axios.get('https://6147374665467e0017384aa5.mockapi.io/favorites'); // запрашиваем "cart" с сервера и рендерим корзину
        // const itemsResponse = await axios.get('https://6147374665467e0017384aa5.mockapi.io/items');

        setIsLoading(false)
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных")
      }
    }

    fetchData()

  }, []);

  const onAddToCart = async (obj) => { // когда произойдет клик в "Card", хук "setCartItems" запушит в массив новый "obj"
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {// если в "cartItems" есть хотя бы один "item" имеет такой "id", который был при нажатии на кнопку "plus", то удалить продукт
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://6147374665467e0017384aa5.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        const {data} = await axios.post('https://6147374665467e0017384aa5.mockapi.io/cart', obj) // при добавлении товара в корзину отправить "obj" на сервер
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))

      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
    }


  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) { // если в стэйте "favorites" есть объект с "id" таким же как у объекта по которому совершили клик
        axios.delete(`https://6147374665467e0017384aa5.mockapi.io/favorites/${obj.id}`);// отправь запрос на удаление
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))//  перебрать стэйт и убрать из него объект, "id" которого, равен "obj.id"
      } else {
        const { data } = await axios.post('https://6147374665467e0017384aa5.mockapi.io/favorites', obj)// дождись ответа, чтобы получить и использовать новые данные а не старые
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
    }
  }

  const omRemoveItem = (id) => {
    try {
      axios.delete(`https://6147374665467e0017384aa5.mockapi.io/cart/${id}`) // при удалении товара , удалить с сервера
      setCartItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины')
    }
  }

  const onChangeSearchInput = (event) => { // елси input изменится, отловить событие, и обновить state
    setSearchValue(event.target.value)
  }

  const isItemsAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        favorites,
        cartItems,
        isItemsAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart
      }}>
      <div className="wrapper clear">
        <Drawer
          onRemove={omRemoveItem}
          onClose={() => setCartOpened(false)}
          items={cartItems}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            items={items}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>


      </div>
    </AppContext.Provider>
  )
}

export default App;
