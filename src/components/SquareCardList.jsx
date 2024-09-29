import React from 'react';
import "../styles/SquareCardList.css";
import SquareCard from './SquareCard';
import CardHeader from './CardHeader';

function SquareCardList({category, title, items}) {
  return (
    <div className="square-card-list-container">
      <CardHeader title={title} category={category}/>
      <div className="square-card-list">
        {items.map((item, index) => (
          <SquareCard key={index} item={item} category={category}/>
        ))}
      </div>
    </div>
  );
}

export default SquareCardList;
