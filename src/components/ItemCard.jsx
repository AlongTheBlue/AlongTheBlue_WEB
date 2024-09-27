import React from 'react';
import "../styles/ItemCard.css";

function ItemCard({ item }) {

    return (
        <div className="item-card">
            <div className='item-images-container'>
                <img src={item.image1} alt={item.title} className="item-image" />
                <img src={item.image2} alt={item.title} className="item-image" />
            </div>
            <div className="item-info">
                <div className='item-header'>
                    <div className='item-title'>{item.title}</div>
                    <img src="/images/icon/unliked.svg"/>
                </div>
                
                <div className='item-address'>
                    <img src='/images/icon/location.svg'/>
                    <div>{item.address}</div>
                </div>
                <div className="hashtags">
                    {item.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
