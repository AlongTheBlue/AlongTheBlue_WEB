import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Category.css" ;

const categories = [
  { icon: '../src/images/icon/category_1.svg', label: '바당따라' },
  { icon: '../src/images/icon/category_2.svg', label: '내주변' },
  { icon: '../src/images/icon/category_3.svg', label: '여행코스' },
  { icon: '../src/images/icon/category_4.svg', label: '여행따라' },
  { icon: '../src/images/icon/category_5.svg', label: '찜' },
  { icon: '../src/images/icon/category_6.svg', label: '관광' },
  { icon: '../src/images/icon/category_7.svg', label: '숙소' },
  { icon: '../src/images/icon/category_8.svg', label: '음식' },
  { icon: '../src/images/icon/category_9.svg', label: '카페' },
  { icon: '../src/images/icon/category_10.svg', label: '마이' }
];

function Category() {
  const navigate = useNavigate();

  const handleAllViewClick = (label) => {
    navigate(`/list/${label}`);
  };

  return (
    <div className="category">
      {categories.map((category, index) => (
        <div key={index} className="category-item" onClick={() => handleAllViewClick(category.label)}>
            <img src={category.icon} alt={category.label} className="category-icon" />
            <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
