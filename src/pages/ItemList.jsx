import { useEffect, useState } from "react";
import "../styles/Page.css";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ItemCardList from "../components/ItemCardList";
import PageHeader from "../components/PageHeader";
import { getItemListByCategory } from "../utils/data";
import Search from "../components/Search";
import Pagenation from "../components/Pagenation";

function ItemList() {
  const { category } = useParams();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemCategory, setItemCategory] = useState("");

  // 데이터 로드 함수
  const getItemList = async (page) => {
    setLoading(true);
    try {
      const data = await getItemListByCategory(category, page);
      setItems(data.content);
      setItemCategory(data.category);
      setTotalPages(data.totalPages);
      console.log(data)

    } catch (error) {
      console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemList(currentPage);
  }, [currentPage]);

  const getTitle = (category) => {
    if (category === "tourData") return "관광";
    else if (category === "restaurant") return "음식";
    else if (category === "accommodation") return "숙소";
    else if (category === "cafe") return "카페";
    else return "여행코스";
  };

  return (
    <div className="page-container">
      <PageHeader title={getTitle(category)} />
      <Search/>
      <ItemCardList items={items} itemCategory={itemCategory} />
      <Pagenation 
        totalPages = {totalPages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
}

export default ItemList;
