import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/CircleCard.css";

function CircleCard({ item, category }) {
  const navigate = useNavigate();

  const handleDetailViewClick = () => {
    navigate(`/${category}/detail/${item.id}`);
  };

  return (
    <div className="circle-card-container">
      <div className="circle-card" onClick={handleDetailViewClick}>
        <img src={item.image} alt={item.name} className="circle-card-image" />
        <div className="circle-card-text">{item.name}</div>
      </div>
    </div>
  );
}

export default CircleCard;
