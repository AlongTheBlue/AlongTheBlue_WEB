import React from 'react';
import "../styles/CircleCardList.css";
import CardHeader from './CardHeader';
import CircleCard from './CircleCard';

function CircleCardList({ category, title, items}) {
  return (
    <div className="circle-card-list-container">
      <CardHeader title={title} category={category}/>
      <div className="circle-card-list">
        {items.map((item, index) => (
          <CircleCard key={index} item={item} category={category}/>
        ))}
      </div>
    </div>
  );
}

export default CircleCardList;
