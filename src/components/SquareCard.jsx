import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SquareCard.css";

function SquareCard({item, category}) {
  const navigate = useNavigate();

  const handleDetailViewClick = () => {
      navigate(`/${category}/detail/${item.contentid}`)
  };

  return (
    <div className="square-card-container" onClick={handleDetailViewClick}>
      <div
        className="square-card-img"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0), 
            rgba(0, 0, 0, 0.5)
          ), url(${item.img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '20vh',
          borderRadius: '5px'
        }}
      />
      <div className="square-card-info">
        <div>
          <div className="square-card-name">{item.title}</div>
        </div>
        <div>
          {item.address ? 
            <div className="square-card-address">{item.address}</div> : 
            <div className="square-card-hashtag">{item.hashtag}</div>
          } 
        </div>
      </div>
    </div>
  );
}

export default SquareCard;
