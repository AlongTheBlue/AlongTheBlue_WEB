import Footer from "../components/Footer";
import Search from "../components/Search";
import { useState } from "react";
import "../styles/Page.css";
import PageHeader from "../components/PageHeader";
import "../styles/SearchPage.css";
import ItemCardList from "../components/ItemCardList";
import { useLocation } from "react-router-dom"; // useLocation import
import { useNavigate, useEffect } from "react";
import { getPlacesByCategory } from "../utils/data.js";

function SearchPage({ searchPlaceMode }) {
  const location = useLocation(); // location으로 전달받은 state 가져오기
  // travelCourses를 location.state에서 받아오기
  const [travelCourses, setTravelCourses] = useState(() => {
    return location.state?.travelCourses || [];
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getPlacesByCategory(selectedCategory);
        setSearchResult(data);
      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const  handleHashtagClick = (category) => {
    setSelectedCategory(category === "전체" ? "all" : category);
  };

  return (
    <div className="page-container">
      <PageHeader title={"검색"} />
      <Search />

      {!searchPlaceMode ? (
        <div>{/* 추천 장소 및 해변은 여전히 고정된 콘텐츠로 제공 */}</div>
      ) : (
        <div className="search-result-container">
          {/* 해시태그 필터 */}
          <div className="hashtags">
            {["전체", "관광", "숙박", "음식", "카페", "바다"].map(
              (category) => (
                <span
                  key={category}
                  className={`hashtag ${
                    selectedCategory ===
                    (category === "전체" ? "all" : category)
                      ? "active"
                      : ""
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
              <div>{searchResult.length}개의 검색결과</div>

              {/* 검색 결과 리스트 */}
              <ItemCardList
                items={searchResult}
                selectMode={true}
                travelCourses={travelCourses}
              />
            </>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
export default SearchPage;
