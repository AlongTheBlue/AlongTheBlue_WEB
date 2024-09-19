import React from 'react';
import "../styles/CircleCardList.css";
import CardHeader from './CardHeader';
import CircleCard from './CircleCard';

function CircleCardList({ title, items }) {
  return (
    <div className="circleCard">
      <CardHeader title={title} />
      <div className="circleCard-list">
        {items.map((item, index) => (
          <CircleCard key={index} item={item} title={title}/>
        ))}
      </div>
    </div>
  );
}

export default CircleCardList;
