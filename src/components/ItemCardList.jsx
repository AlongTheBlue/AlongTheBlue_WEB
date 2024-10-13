import "../styles/ItemCardList.css";
import ItemCard from "./ItemCard";


function ItemCardList({ items, selectMode, travelCourses, itemCategory }) {

  // console.log(itemCategory)

  return (
    <div className="item-card-list-container">
      <div className="item-card-list">
        {items.map((item, index) => (
          <ItemCard
            key={index}
            item={item}
            itemCategory = {itemCategory}
            selectMode={selectMode}
            travelCourses={travelCourses}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemCardList;
