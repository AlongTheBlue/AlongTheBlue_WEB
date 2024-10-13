import { useNavigate } from 'react-router-dom';
import "../styles/CircleCard.css";

function CircleCard({ item, category }) {
  const navigate = useNavigate();

  const handleDetailViewClick = () => {
    navigate(`/${category}/detail/${item.contentid}`);
  };

  // title의 길이에 따라 클래스명을 동적으로 할당
  const titleClass = item.title.length > 6 ? 'circle-card-text small-text' : 'circle-card-text';

  return (
    <div className="circle-card-container">
      <div className="circle-card" onClick={handleDetailViewClick}>
        <img src={item.img} alt={item.title} className="circle-card-image" />
        <div className={titleClass}>{item.title}</div>
      </div>
    </div>
  );
}

export default CircleCard;
