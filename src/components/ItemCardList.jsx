import React from 'react';
import "../styles/ItemCardList.css";
import ItemCard from './ItemCard';

function ItemCardList({items}) {

    return (
        <div className="item-card-list-container">
            <div className="item-card-list">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ItemCardList;
