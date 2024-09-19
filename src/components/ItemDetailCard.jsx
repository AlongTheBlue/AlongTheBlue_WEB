import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ItemDetailCard.css";

function ItemDetailCard({item}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/`);
  };

  const handleBeforeClick = () => {
    navigate(-1);
  };

  return (
    <div className="item-detail-card">
      <div className="item-detail-header">
        <div className='item-detail-btn'>
          <img src="/src/images/icon/left_arrow_white.svg" onClick={handleBeforeClick}/>
          <img src="/src/images/icon/home.svg" onClick={handleHomeClick}/>
        </div>
        <div>
          <img src={item.image} alt={item.name} className="item-detail-image" />
        </div>
      </div>
      <div className="item-detail-info">
        <div className="detail-info-header">
          <div className='item-detail-name'>{item.name}</div>
          <img src='/src/images/icon/liked.svg'/>
        </div>
        <div className="item-detail-address">
          <div className='item-detail-img'>
            <img src='/src/images/icon/detail_address.svg'/>
          </div>
          <div className='item-detail-text'>{item.address}</div>
        </div>
        <div className="item-detail-holiday">
          <div className='item-detail-img'>
            <img src='/src/images/icon/detail_holiday.svg'/>
          </div>
          <div className='item-detail-text'>{item.holiday}</div>
        </div>
        <div className="item-detail-weather">
          <div className='item-detail-img'>
            <img src='/src/images/icon/weather_sunny.svg'/>
          </div>
          <div className='item-detail-text'>{item.weather}</div>
        </div>
        <div className="hashtags">
          {item.hashtags.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="item-detail-introduction">
        <div className='introduction-header'>소개</div>
        <div className='introduction-text'>{item.introduction}</div>
      </div>

      {/* 지도 */}
      <div className="item-detail-map">
        지도
      </div>
    </div>
  );
}

export default ItemDetailCard;
