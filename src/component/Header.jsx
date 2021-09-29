import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'

function Header({ onClickCart }) {
    const {cartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img src="/img/logo.png" alt="logo" width={40} height={40} />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>


            <ul className="d-flex">
                <li
                    onClick={onClickCart}
                    className="mr-30 cu-p">
                    <img src="/img/cart.svg" alt="cart" width={18} height={18} />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img className="mr-30" src="/img/heart.svg" alt="cart" width={18} height={18} />
                    </Link>
                </li>
                <li>
                    <img src="/img/user.svg" alt="cart" width={18} height={18} />
                </li>
            </ul>
        </header>
    )
}

export default Header
