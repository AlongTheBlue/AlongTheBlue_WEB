import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomeCategory.css" ;

const categories = [
  { icon: '../src/images/icon/category_1.svg', label: '바당따라', route: '/along/blues'},
  { icon: '../src/images/icon/category_2.svg', label: '내주변', route: '/around'},
  { icon: '../src/images/icon/category_3.svg', label: '여행코스', route: '/courses'},
  { icon: '../src/images/icon/category_4.svg', label: '여행따라', route:'/along/courses' },
  { icon: '../src/images/icon/category_5.svg', label: '찜' , route: '/my/likes'},
  { icon: '../src/images/icon/category_6.svg', label: '관광' , route: '/list/관광'},
  { icon: '../src/images/icon/category_7.svg', label: '숙소', route: '/list/숙소' },
  { icon: '../src/images/icon/category_8.svg', label: '음식', route: '/list/음식' },
  { icon: '../src/images/icon/category_9.svg', label: '카페', route: '/list/카페' },
  { icon: '../src/images/icon/category_10.svg', label: '마이', route: '/my' }
];

function Category() {
  const navigate = useNavigate();

  const handleAllViewClick = (label) => {
    navigate(`${label}`);
  };

  return (
    <div className="home-category">
      {categories.map((category, index) => (
        <div key={index} className="home-category-item" onClick={() => handleAllViewClick(category.route)}>
            <img src={category.icon} alt={category.label} className="home-category-icon" />
            <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
