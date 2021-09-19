import React from 'react'

function Card({ name, price, imgUrl }) {
    return (
        <div className="card">
            <div className="favorite">
                <img src="/img/heart-unliked.svg" alt="heart-unliked" />
            </div>
            <img src={imgUrl} alt="sneakers" width={133} height={112} />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <button className="button">
                    <img src="/img/button-plus.svg" alt="Plus" width={11} height={11} />
                </button>
            </div>
        </div>
    )
}

export default Card
