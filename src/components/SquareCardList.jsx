import React from 'react';
import "../styles/SquareCardList.css";
import SquareCard from './SquareCard';
import CardHeader from './CardHeader';

function SquareCardList({title, items}) {
  return (
    <div className="square-card-list-container">
      <CardHeader title={title} />
      <div className="square-card-list">
        {items.map((item, index) => (
          <SquareCard key={index} item={item} title={title}/>
        ))}
      </div>
    </div>
  );
}

export default SquareCardList;
