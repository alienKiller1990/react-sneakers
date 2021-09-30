import React from 'react';
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import { AppContext } from '../../App'


function Card({ id, title, price, imgUrl, onPlus, onFavorite, favorited = false, loading = false }) {

    const { isItemsAdded } = React.useContext(AppContext);
    // const [isAdded, setIsAdded] = React.useState(added); // хук для смены иконки добавить в корзину / убрать из корзины
    const [isFavorite, setIsFavorite] = React.useState(favorited) // хук для смены иконки добавить в ибранное / убрать

    const onClickPlus = () => { // при клике на "img" запускаем "onPlus" из пропсов, и хук "setIsAdded" 
        onPlus({ id, title, price, imgUrl }) // вспомогательная функция для хука, для смены иконки добавить в корзину / убрать из корзины
        // setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({ id, title, price, imgUrl })
        setIsFavorite(!isFavorite)
    }



    return (
        <div className={styles.card}>
            {
                loading ?
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={200}
                        viewBox="0 0 150 187"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="270" y="310" rx="0" ry="0" width="8" height="7" />
                        <rect x="148" y="366" rx="0" ry="0" width="1" height="1" />
                        <rect x="200" y="393" rx="0" ry="0" width="0" height="1" />
                        <rect x="0" y="0" rx="6" ry="6" width="150" height="90" />
                        <rect x="0" y="106" rx="6" ry="6" width="150" height="15" />
                        <rect x="0" y="125" rx="3" ry="3" width="90" height="15" />
                        <rect x="0" y="162" rx="4" ry="4" width="80" height="24" />
                        <rect x="112" y="155" rx="6" ry="6" width="32" height="32" />
                    </ContentLoader> :
                    <>
                        {onFavorite && <div
                            className={styles.favorite}>
                            <img
                                src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                                onClick={onClickFavorite}
                                alt="heart-unliked" />
                        </div>}
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
                            {onPlus && <img
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemsAdded(id) ? "/img/button-checked.svg" : "/img/button-plus.svg"}
                                alt="Plus"
                            />}
                        </div>
                    </>
            }

        </div>
    )
}

export default Card