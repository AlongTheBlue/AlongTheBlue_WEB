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
    const referrer = document.referrer; // 이전 페이지의 URL

    // 이전 페이지가 우리 사이트 내부 URL인지 확인
    if (referrer && referrer.includes(window.location.origin)) {
      // history 스택에 두 개 이상의 항목이 있을 때만 뒤로 이동 (-1)
      if (window.history.length > 1) {
        navigate(-1);
      }
    } else {
      navigate('/'); // 외부에서 접속했거나, 이전 페이지가 없으면 홈으로 이동
    }
  };

  useEffect(() => {
    const { kakao } = window;

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 위치: 서울 시청
      level: 3 // 지도 확대 레벨
    };
   
    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
 
    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 줌 컨트롤러 추가

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
  }, []);

  return (
    <div className="item-detail-card">
      <div className="item-detail-header">
        <div className='item-detail-btn'>
          <img src="/images/icon/left_arrow_white.svg" onClick={handleBeforeClick}/>
          <img src="/images/icon/home.svg" onClick={handleHomeClick}/>
        </div>
        <div>
          <img src={item.image} alt={item.name} className="item-detail-image" />
        </div>
      </div>
      <div className="item-detail-info">
        <div className="detail-info-header">
          <div className='item-detail-name'>{item.name}</div>
          <img src='/images/icon/liked.svg'/>
        </div>
        <div className="item-detail-address">
          <div className='item-detail-img'>
            <img src='/images/icon/detail_address.svg'/>
          </div>
          <div className='item-detail-text'>{item.address}</div>
        </div>
        <div className="item-detail-holiday">
          <div className='item-detail-img'>
            <img src='/images/icon/detail_holiday.svg'/>
          </div>
          <div className='item-detail-text'>{item.holiday}</div>
        </div>
        <div className="item-detail-weather">
          <div className='item-detail-img'>
            <img src='/images/icon/weather_sunny.svg'/>
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
