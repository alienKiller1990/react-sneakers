import Card from "./component/Card";
import Drawer from "./component/Drawer";
import Header from "./component/Header";

const arr = [
  { name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imgUrl: '/img/sneakers/1.jpg' },
  { name: 'Мужские Кроссовки Nike Air Max 270', price: 15600, imgUrl: '/img/sneakers/2.jpg'  },
]

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex">

          {
            arr.map(val => <Card name={val.name} price={val.price} imgUrl={val.imgUrl}/>)
          }

        </div>
      </div>
    </div>
  )
}

export default App;
