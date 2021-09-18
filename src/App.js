


function App() {
  return (
    <div className="wrapper clear">
      <header className="d-flex justify-between align-center p-40">

        <div className="d-flex align-center">
          <img src="/img/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>

        <ul className="d-flex">
          <li className="mr-30">
            <img src="/img/cart.svg" alt="cart" width={18} height={18} />
            <span>1205 руб.</span>
          </li>
          <li>
            <img src="/img/user.svg" alt="cart" width={18} height={18} />
          </li>
        </ul>

      </header>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex justify-around">
          <div className="card">
            <img src="/img/sneakers/1.jpg" alt="sneakers" width={133} height={112} />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img src="/img/plus.svg" alt="Plus" width={11} height={11} />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/sneakers/2.jpg" alt="sneakers" width={133} height={112} />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img src="/img/plus.svg" alt="Plus" width={11} height={11} />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/sneakers/3.jpg" alt="sneakers" width={133} height={112} />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img src="/img/plus.svg" alt="Plus" width={11} height={11} />
              </button>
            </div>
          </div>

          <div className="card">
            <img src="/img/sneakers/4.jpg" alt="sneakers" width={133} height={112} />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column ">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
                <img src="/img/plus.svg" alt="Plus" width={11} height={11} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;
