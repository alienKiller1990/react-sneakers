import React from 'react';
import styles from './Card.module.scss';

function Card({ id, title, price, imgUrl, onPlus, onFavorite, favorited = false}) {

    const [isAdded, setIsAdded] = React.useState(false); // хук для смены иконки добавить в корзину / убрать из корзины
    const [isFavorite, setIsFavorite] = React.useState(favorited) // хук для смены иконки добавить в ибранное / убрать

    const onClickPlus = () => { // при клике на "img" запускаем "onPlus" из пропсов, и хук "setIsAdded" 
        if (!isAdded) {
            onPlus({ title, price, imgUrl }) // вспомогательная функция для хука, для смены иконки добавить в корзину / убрать из корзины
        }
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({ id, title, price, imgUrl })
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styles.card}>
            <div
                className={styles.favorite}>
                <img
                    src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                    onClick={onClickFavorite}
                    alt="heart-unliked" />
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