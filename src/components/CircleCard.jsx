import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/CircleCard.css";

function CircleCard({ item, title }) {
  const navigate = useNavigate();

  const handleDetailViewClick = () => {
    navigate(`/${title}/detail/${item.id}`);
  };

  return (
    <div className="circleCard-item">
      <div className="circle-container" onClick={handleDetailViewClick}>
        <img src={item.image} alt={item.name} className="circle-image" />
        <div className="circle-text">{item.name}</div>
      </div>
    </div>
  );
}

export default CircleCard;
