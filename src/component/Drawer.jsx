import axios from 'axios';
import React from 'react'
import { AppContext } from '../App';
import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, items = [], onRemove }) {
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);// товар заказан ?
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const { cartItems, setCartItems } = React.useContext(AppContext)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://6147374665467e0017384aa5.mockapi.io/order',{
                items: cartItems
            });
            
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItems([]);
            
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6147374665467e0017384aa5.mockapi.io/cart/' + item.id);
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <div className="overlay">

            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img
                        onClick={onClose}
                        className="removeBtn cu-p"
                        src="/img/button-remove.svg"
                        alt="Remove" />
                </h2>

                {
                    items.length > 0
                        ?
                        <div className="flex-column d-flex justify-between h100p">
                            <div className="items flex ">
                                {items.map((obj, id) => (
                                    <div className="cartItem d-flex align-center mb-20" key={`${obj}_${id}`}>
                                        <div
                                            style={{ backgroundImage: `url(${obj.imgUrl})` }}
                                            className="cartItemImg">
                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img
                                            onClick={() => onRemove(obj.id)}
                                            className="removeBtn"
                                            src="/img/button-remove.svg"
                                            alt="Remove" />
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li className="d-flex">
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>21 498 руб. </b>
                                    </li>
                                    <li className="d-flex">
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>1074 руб. </b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                    Оформить заказ
                                    <img src="/img/arrow-right.svg" alt="arrow" />
                                </button>
                            </div>
                        </div>
                        :
                        <Info
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete
                                ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке`
                                : "Добавьте хотя бы пару кроссовок, чтобы сделать заказ."}
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg" }/>
                    // <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                    //     <img className="mb-20" width={120} height={120} src="/img/empty-cart.jpg" alt="Empty" />
                    //     <h2>Корзина пустая</h2>
                    //     <p className="opacity-6">
                    //         Добавьте хотя бы пару кроссовок, чтобы сделать заказ.
                    //     </p>
                    //     <button
                    //         onClick={onClose}
                    //         className="greenButton">
                    //         <img src="/img/arrow-right.svg" alt="Arrow" />
                    //         Вернуться назад
                    //     </button>
                    // </div>
                }

            </div>

        </div>
    )
}

export default Drawer
