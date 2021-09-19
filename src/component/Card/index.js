import React from 'react';
import styles from './Card.module.scss';

function Card({ title, price, imgUrl, onPlus, onFavorite }) {

    const [isAdded, setIsAdded] = React.useState(false); // хук для смены иконки добавить в корзину / убрать из корзины

    const onClickPlus = () => { // при клике на "img" запускаем "onPlus" из пропсов, и хук "setIsAdded" 
        onPlus({ title, price, imgUrl}) // вспомогательная функция для хука, для смены иконки добавить в корзину / убрать из корзины
        setIsAdded(!isAdded)
    }


    return (
        <div className={styles.card}>
            <div
                onClick={onFavorite}
                className={styles.favorite}>
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
                <img
                    className={styles.plus}
                    onClick={onClickPlus}
                    src={isAdded ? "/img/button-checked.svg" : "/img/button-plus.svg"}
                    alt="Plus"
                />
            </div>
        </div>
    )
}

export default Card