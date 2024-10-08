import "../styles/ItemCardList.css";
import ItemCard from "./ItemCard";


function ItemCardList({ items, selectMode, travelCourses }) {

  return (
    <div className="item-card-list-container">
      <div className="item-card-list">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            selectMode={selectMode}
            travelCourses={travelCourses}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemCardList;
