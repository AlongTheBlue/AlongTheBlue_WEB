import React from 'react';
import "../styles/ItemCardList.css";
import ItemCard from './ItemCard';
import { useEffect } from 'react';

function ItemCardList({items, selectMode, travelCourses}) {
    useEffect(() => {
        if(travelCourses)
            console.log("카드", travelCourses);
    })
    return (
        <div className="item-card-list-container">
            <div className="item-card-list">
                {items.map((item, index)=> (
                    <ItemCard key={index} item={item} selectMode={selectMode} travelCourses={travelCourses}/>
                ))}
            </div>
        </div>
    );
}

export default ItemCardList;
