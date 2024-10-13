import "../styles/CircleCardList.css";
import CardHeader from './CardHeader';
import CircleCard from './CircleCard';
import { useEffect, useState } from 'react';
import { getHomePlacesByCategory } from '../utils/data';

function CircleCardList({ category, title}) {
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
    <div className="circle-card-list-container">
      <CardHeader title={title} category={category}/>
      <div className="circle-card-list">
      {loading ? (
            <div>로딩 중...</div>
          ) : (
            items.map((item, index) => (
              <CircleCard key={index} item={item} category={category}/>
            ))
          )} 
      </div>
    </div>
  );
}

export default CircleCardList;
