import axios from 'axios'
import React from 'react'
import { AppContext } from '../App'
import Card from '../component/Card'

function Orders() {
    const { onAddToCart, onAddToFavorite } = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('https://6147374665467e0017384aa5.mockapi.io/order');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false)
            } catch (error) {
                alert('Ошибка пр запросе заказов')
            }
        })()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, id) => (
                    <Card
                        key={`${id}`}
                        loading={isLoading}
                        {...item}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default Orders
