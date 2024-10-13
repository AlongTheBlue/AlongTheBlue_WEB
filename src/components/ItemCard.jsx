import "../styles/ItemCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailHashtags } from "../utils/data";

function ItemCard({ item, selectMode, travelCourses, itemCategory }) {
  const [hashtagLoading, setHashtagLoading] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const navigate = useNavigate();

  const handlePlaceDetail = () => {
    navigate(`/${itemCategory}/detail/${item.contentId}`)
  }

  const handleSelectPlace = () => {
    console.log("선택한 장소:", item);
    console.log("현재 여행 코스:", travelCourses);

    // 중복 방지: 현재 선택된 장소가 travelCourses에 이미 있는지 확인
    const isDuplicate = travelCourses.some(
      (course) => course.title === item.title
    );

    if (!isDuplicate) {
      // 중복되지 않을 때만 navigate
      navigate("/along/courses/form/1", {
        state: {
          selectedPlace: item,
          travelCourses: [...travelCourses, item], // 기존 코스에 새로 추가
        },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setHashtagLoading(true);
      try {
        const data = await getDetailHashtags(itemCategory, item.contentId);
        setHashtags(data);
      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setHashtagLoading(false);
      }
    };
    console.log(item)

    fetchData();
  }, [itemCategory, item.contentId]);

  return (
    <div className="item-card">
      <div className="item-images-container">
        {/* 이미지가 있으면 렌더링 */}
        {item.images && item.images.length > 0 ? (
          <>
            <img src={item.images[0].originimgurl} alt={item.title} className="item-image" onClick={handlePlaceDetail}/>
            {item.images[1] ? (
              <img src={item.images[1].originimgurl} alt={item.title} className="item-image" onClick={handlePlaceDetail}/>
            ) : (
              <img src={item.images[0].originimgurl} alt={item.title} className="item-image" onClick={handlePlaceDetail}/>
            )}
          </>
        ) : null}
      </div>
      <div className="item-info">
        <div className="item-header">
          <div className="item-title" onClick={handlePlaceDetail}>{item.title}</div>
          {selectMode ? (
            <div className="item-select" onClick={handleSelectPlace}>
              선택하기
            </div>
          ) : (
            <img src="/images/icon/unliked.svg" alt="unliked icon" style={{visibility: "hidden"}}/>
          )}
        </div>
        <div className="item-address">
          <img src="/images/icon/location.svg" alt="location icon" />
          <div>{item.address}</div>
        </div>
        <div className="hashtags">
          {hashtagLoading ?  
            <div className="loading">해시태그 로딩중..</div>
            :
            hashtags.map((tag, index) => (
              <span key={index} className="hashtag">{tag}</span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
