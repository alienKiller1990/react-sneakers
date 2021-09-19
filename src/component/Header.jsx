import React from 'react'

function Header({ onClickCart }) {
    
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img src="/img/logo.png" alt="logo" width={40} height={40} />
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>

            <ul className="d-flex">
                <li
                    onClick={onClickCart}
                    className="mr-40 cu-p">
                    <img src="/img/cart.svg" alt="cart" width={18} height={18} />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img src="/img/user.svg" alt="cart" width={18} height={18} />
                </li>
            </ul>
        </header>
    )
}

export default Header
