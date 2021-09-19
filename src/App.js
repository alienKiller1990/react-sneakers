import Card from "./component/Card";
import Drawer from "./component/Drawer";
import Header from "./component/Header";

const arr = [
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imgUrl: '/img/sneakers/1.jpg' },
  { title: 'Мужские Кроссовки Nike Air Max 270', price: 15600, imgUrl: '/img/sneakers/2.jpg' },
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 13600, imgUrl: '/img/sneakers/3.jpg' },
  { title: 'Кроссовки Puma X Aka Boku Future Rider', price: 10000, imgUrl: '/img/sneakers/4.jpg' },
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
            arr.map((val, id) => (
              <Card
                onClickButton={() => console.log(val)}
                title={val.title}
                price={val.price}
                imgUrl={val.imgUrl}
                key={`${val.title}_${id}`} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App;
