import Footer from "../components/Footer";
import Search from "../components/Search";
import { useState } from "react";
import "../styles/Page.css";
import PageHeader from "../components/PageHeader";
import "../styles/SearchPage.css";
import ItemCardList from "../components/ItemCardList";
import { useLocation } from "react-router-dom"; // useLocation import
import { useNavigate, useEffect } from "react";
import { getItemListByCategory, getPlacesByCategory, getPlacesByKeywordAndCategory } from "../utils/data.js";
import Pagenation from "../components/Pagenation.jsx";

function SearchPage({ searchPlaceMode }) {
  const location = useLocation(); // location으로 전달받은 state 가져오기
  // travelCourses를 location.state에서 받아오기
  const [travelCourses, setTravelCourses] = useState(() => {
    return location.state?.travelCourses || [];
  });
  const [selectedCategory, setSelectedCategory] = useState("음식");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
  const [searchTrigger, setSearchTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemCategory, setItemCategory] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getPlacesByCategory(selectedCategory);
  //       setSearchResult(data);
  //     } catch (error) {
  //       console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedCategory]);

  const getItemList = async (page) => {
    const categoryMapping = {
        관광: "tourData",
        숙박: "accommodation",
        음식: "restaurant",
        카페: "cafe",
      };
    let category = categoryMapping[selectedCategory] ?? null;
    
    setLoading(true);
    try {
      const data = await getItemListByCategory(category, page);
      console.log(data)
      setSearchResult(data.content);
      setTotalPages(data.totalPages);
      setItemCategory(data.category)

    } catch (error) {
      console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemList(currentPage);
  }, [currentPage, selectedCategory]);

  useEffect(() =>{
    setCurrentPage(0)
  }, [selectedCategory])

  const  handleHashtagClick = (category) => {
    setSelectedCategory(category === "tourData" ? "관광" : category);
  };

  useEffect(() => {
    if(searchTrigger == 0 ) 
      return

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPlacesByKeywordAndCategory(keyword, selectedCategory);
        setSearchResult(data);
        setTotalPages(data.totalPages);

      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [searchTrigger]);

  return (
    <div className="page-container">
      <PageHeader title={searchPlaceMode ? "장소추가" :"검색"} />
      <Search onSearch={setKeyword} onTrigger={setSearchTrigger} />
        {/*<div>추천 장소 및 해변은 여전히 고정된 콘텐츠로 제공</div>*/}
        <div className="search-result-container">
          {/* 해시태그 필터 */}
          <div className="hashtags">
            {["관광", "숙박", "음식", "카페"].map(
              (category) => (
                <span
                  key={category}
                  className={`hashtag ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleHashtagClick(category)}
                >
                  {category}
                </span>
              )
            )}
          </div>

          {loading ? (
            <div>로딩 중...</div>
          ) : (
            <>
              {/* <div>{searchResult.length}개의 검색결과</div> */}

              {/* 검색 결과 리스트 */}
              <ItemCardList
                items={searchResult}
                selectMode={searchPlaceMode ? true : false}
                travelCourses={travelCourses}
                itemCategory={itemCategory}
              />
            </>
          )}
        </div>
      <Pagenation 
        totalPages = {totalPages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
}
export default SearchPage;
