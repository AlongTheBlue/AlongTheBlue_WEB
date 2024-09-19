import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/CardHeader.css"

function CardHeader({title}) {
  const navigate = useNavigate();

  const handleAllViewClick = () => {
    navigate(`/list/${title}`);
  };

  return (
    <div className="card-container">
      <div className="card-title">{title}</div>
      <div className='card-all' onClick={handleAllViewClick}>전체보기</div>
    </div>
  );
}

export default CardHeader;
