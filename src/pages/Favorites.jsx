import React from 'react'
import Card from '../component/Card'

function Favorites({ items, onAddToFavorite }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Избранное</h1>
            </div>

            <div className="d-flex flex-wrap">
                {
                    items.map((item, id) => (
                        <Card
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            key={`${item.title}_${id}`}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Favorites
