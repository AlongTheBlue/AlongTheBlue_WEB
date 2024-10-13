import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ItemDetailCard.css";
import { getDetailHashtags, getImgByWeatherCondition, getPlaceDetailByCategoryAndId } from '../utils/data';

function ItemDetailCard({category, id}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [hashtagLoading, setHashtagLoading] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
          console.log(category, id)
        const data = await getPlaceDetailByCategoryAndId(category, id);
        setItem(data);
        console.log(item)
      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    console.log(item)

    fetchData();
  }, [category, id]);

  useEffect(() => {
    const fetchData = async () => {
      setHashtagLoading(true);
      try {
          console.log(category, id)
        const data = await getDetailHashtags(category, id);
        setHashtags(data);
      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setHashtagLoading(false);
      }
    };
    console.log(item)

    fetchData();
  }, [category, id]);

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

  const weatherImg = getImgByWeatherCondition(item.weatherCondition);

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
    // const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    // ps.keywordSearch(item.address, function(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //     // 결과값으로 받은 위치를 지도에 표시합니다
    //     const marker = new kakao.maps.Marker({
    //       map: map,
    //       position: coords
    //     });

    //     // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //     map.setCenter(coords);
    //   } else {
    //     console.error('키워드 검색 결과가 없습니다.');
    //   }
    // });
    
    // 결과값으로 받은 위치를 지도에 표시합니다
    console.log(item)
    const coords = new kakao.maps.LatLng(item.yMap, item.xMap);
    const marker = new kakao.maps.Marker({
      map: map,
      position: coords
    });

    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    map.setCenter(coords);

  }, [item]);

  return (
    <div className="item-detail-card">
      <div className="item-detail-header">
        <div className='item-detail-btn'>
          <img src="/images/icon/left_arrow_white.svg" onClick={handleBeforeClick} />
          <img src="/images/icon/home.svg" onClick={handleHomeClick} />
        </div>
        <div>
          <img src={item.img} alt={item.title} className="item-detail-image" />
        </div>
      </div>
      <div className="item-detail-info">
        <div className="detail-info-header">
          <div className='item-detail-name'>{item.title}</div>
          <img src='/images/icon/liked.svg' />
        </div>
        <div className="item-detail-address">
          <div className='item-detail-img'>
            <img src='/images/icon/detail_address.svg' />
          </div>
          <div className='item-detail-text'>{item.address}</div>
        </div>
        <div className="item-detail-holiday">
          <div className='item-detail-img'>
            <img src='/images/icon/detail_holiday.svg' />
          </div>
          <div className='item-detail-text'>
            {item.time && item.time.length > 0 ? item.time : '없음'}
          </div>
        </div>
        <div className="item-detail-weather">
          <div className='item-detail-img'>
            <img src={weatherImg} />
          </div>
          <div className='item-detail-text'>{item.temperature}°C</div>
        </div>
        <div className="hashtags">
          {hashtagLoading ?  
          <div className='loading'>해시태그 로딩중..</div>
          :
          hashtags.map((tag, index) => (
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
