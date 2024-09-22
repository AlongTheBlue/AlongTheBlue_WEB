import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/ItemCardList.css";
import ItemCard from './ItemCard';

function ItemCardList({title, items}) {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate(`/`);
    };

    return (
        <div className="item-card-list-page">
            <div className='item-card-list-header'>
                <img src='../src/images/icon/left_arrow.svg' onClick={handleHomeClick}/>
                <div className='item-card-list-title'>{title}</div>
            </div>
            <div className="item-card-list">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} title={title}/>
                ))}
            </div>
        </div>
    );
}

export default ItemCardList;
