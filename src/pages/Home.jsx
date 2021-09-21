import React from 'react'
import Card from "../component/Card";


function Home({ searchValue, setSearchValue, onChangeSearchInput, items, onAddToCart, onAddToFavorite, }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {
                        searchValue && <img // Если "seacrhValue" существует отобрази кнопку "clear"
                            onClick={() => setSearchValue('')} // по клику на кнопку очистить state
                            className="clear cu-p"
                            src="/img/button-remove.svg"
                            alt="Clear" />
                    }
                    <input // контролируемый input т.к. в свойстве value значение из state
                        onChange={onChangeSearchInput}
                        placeholder="Поиск..."
                        value={searchValue} />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {
                    items
                        .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) // покажи те карточки, в которых присутствует "searchValue"
                        .map((item, id) => (
                            <Card
                                onPlus={(obj) => onAddToCart(obj)}
                                onFavorite={(obj) => onAddToFavorite(obj)}
                                key={`${item.title}_${id}`}
                                {...item}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default Home
