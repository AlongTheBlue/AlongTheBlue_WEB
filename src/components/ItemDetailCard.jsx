import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ItemDetailCard.css";

function ItemDetailCard({item}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/`);
  };

  const handleBeforeClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const { kakao } = window;

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 위치: 서울 시청
      level: 4 // 지도 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(item.name, function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 지도에 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      } else {
        console.error('키워드 검색 결과가 없습니다.');
      }
    });
  }, [item.name]);

  return (
    <div className="item-detail-card">
      <div className="item-detail-header">
        <div className='item-detail-btn'>
          <img src="/src/images/icon/left_arrow_white.svg" onClick={handleBeforeClick}/>
          <img src="/src/images/icon/home.svg" onClick={handleHomeClick}/>
        </div>
        <div>
          <img src={item.image} alt={item.name} className="item-detail-image" />
        </div>
      </div>
      <div className="item-detail-info">
        <div className="detail-info-header">
          <div className='item-detail-name'>{item.name}</div>
          <img src='/src/images/icon/liked.svg'/>
        </div>
        <div className="item-detail-address">
          <div className='item-detail-img'>
            <img src='/src/images/icon/detail_address.svg'/>
          </div>
          <div className='item-detail-text'>{item.address}</div>
        </div>
        <div className="item-detail-holiday">
          <div className='item-detail-img'>
            <img src='/src/images/icon/detail_holiday.svg'/>
          </div>
          <div className='item-detail-text'>{item.holiday}</div>
        </div>
        <div className="item-detail-weather">
          <div className='item-detail-img'>
            <img src='/src/images/icon/weather_sunny.svg'/>
          </div>
          <div className='item-detail-text'>{item.weather}</div>
        </div>
        <div className="hashtags">
          {item.hashtags.map((tag, index) => (
            <span key={index} className="hashtag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="item-detail-introduction">
        <div className='introduction-header'>소개</div>
        <div className='introduction-text'>{item.introduction}</div>
      </div>

      <div className='item-detail-introduction'>
        <div className='introduction-header'>위치</div>
        <div id="map" className="item-detail-map"></div>
      </div>
    </div>
  );
}

export default ItemDetailCard;
