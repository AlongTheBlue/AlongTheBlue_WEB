import "../styles/SquareCardList.css";
import SquareCard from './SquareCard';
import CardHeader from './CardHeader';
import { getHomePlacesByCategory, getPlacesByCategory } from '../utils/data';
import { useState, useEffect } from 'react';

function SquareCardList({category, title}) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getHomePlacesByCategory(category);
        setItems(data);
      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);
  
  return (
    <div className="square-card-list-container">
        <CardHeader title={title} category={category}/>
      <div className="square-card-list">
      {loading ? (
            <div>로딩 중...</div>
          ) : (
            items.map((item, index) => (
              <SquareCard key={index} item={item} category={category} />
            ))
          )} 
      </div>
    </div>
  );
}

export default SquareCardList;
