import React from 'react';
import styles from './Card.module.scss';

function Card({ title, price, imgUrl, onClickButton }) {
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-unliked.svg" alt="heart-unliked" />
            </div>
            <img
                src={imgUrl}
                alt="sneakers"
                width={133}
                height={112} />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column ">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <button
                    onClick={onClickButton}
                    className="button">
                    <img
                        src="/img/button-plus.svg"
                        alt="Plus"
                        width={11}
                        height={11} />
                </button>
            </div>
        </div>
    )
}

export default Card