import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SquareCard.css";

function SquareCard({item, title}) {
  const navigate = useNavigate();

  const handleDetailViewClick = () => {
    navigate(`/${title}/detail/${item.id}`);
  };

  return (
    <div className="squareCard-item" onClick={handleDetailViewClick}>
      <div
        className="squareCard-image"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0), 
            rgba(0, 0, 0, 0.5)
          ), url(${item.image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '12.5em',
        }}
      />
      <div className="squareCard-info">
        <div className="squareCard-name">{item.name}</div>
        <div className="squareCard-address">{item.address}</div>
      </div>
    </div>
  );
}

export default SquareCard;
