import React from 'react'

function Drawer({ onClose, items = [] }) {
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
                    <button className="greenButton">
                        Оформить заказ
                        <img src="/img/arrow-right.svg" alt="arrow" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Drawer
