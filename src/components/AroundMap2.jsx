import React, { useEffect, useState } from 'react';
import "../styles/AroundMap.css"; // 스타일은 여기에 추가합니다.

function AroundMap() {
  const [position, setPosition] = useState(null); // 현재 위치 상태 관리
  const [map, setMap] = useState(null); // 지도 객체 상태 관리
  const [placesService, setPlacesService] = useState(null); // 장소 검색 서비스 상태 관리
  const [markers, setMarkers] = useState([]); // 마커 배열 상태 관리
  const [placeOverlay, setPlaceOverlay] = useState(null); // 커스텀 오버레이 상태 관리
  const [contentNode, setContentNode] = useState(null); // 오버레이 콘텐츠 노드 관리
  const [currCategory, setCurrCategory] = useState(''); // 현재 선택된 카테고리
  const categories = [
    { id: 'AT4', name: '관광', iconClass: 'restaurant' },
    { id: 'AD5', name: '숙박', iconClass: 'cafe' },
    { id: 'FD6', name: '음식', iconClass: 'hospital' },
    { id: 'CE7', name: '카페', iconClass: 'pharmacy' }
  ]; // 카테고리 리스트

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      });
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (position) {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(position.lat, position.lng),
        level: 4, // 지도 확대 레벨
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
      
      const ps = new window.kakao.maps.services.Places(kakaoMap);
      setPlacesService(ps);

      // 커스텀 오버레이 생성 및 설정 (한 번만 설정)
      const overlayNode = document.createElement('div');
      overlayNode.className = 'placeinfo_wrap';
      setContentNode(overlayNode);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayNode,
        zIndex: 1,
      });

      setPlaceOverlay(customOverlay);

      window.kakao.maps.event.addListener(kakaoMap, 'idle', () => {
        const center = kakaoMap.getCenter(); // 지도의 중심 좌표
        console.log("Updated center position:", center);
  
        // position 상태를 지도의 중심 좌표로 업데이트
        setPosition({
          lat: center.getLat(),
          lng: center.getLng(),
        });
        console.log(currCategory)
        // 카테고리가 있을 경우에만 장소 검색
        if (currCategory) {
          searchPlaces(center);
        }
      });
    }
  }, [position, currCategory]);

  useEffect(() => {
    if (map && currCategory) {
      clearMarkers();
      searchPlaces();
    }
  }, [currCategory, map]);

  // 마커를 모두 제거하는 함수
  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 카테고리 검색 함수
  const searchPlaces = (center) => {
    if (!currCategory || !map) return;

    // 커스텀 오버레이 숨기기
    if (placeOverlay) {
      placeOverlay.setMap(null);
    }

    // 지도에 표시된 마커 제거
    clearMarkers();

    // const center = map.getCenter();

    // 카테고리로 장소 검색
    placesService.categorySearch(
      currCategory,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          displayPlaces(data);
        }
      },
      // { location: new window.kakao.maps.LatLng(position.lat, position.lng), radius: 5000 }
      { location: center, radius: 5000 }
    );
  };

  // 장소를 지도에 마커로 표시하는 함수
  const displayPlaces = (places) => {
    const newMarkers = places.map((place) => {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(markerPosition);

      // 마커 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
        displayPlaceInfo(place);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  // 마커를 생성하고 지도에 표시하는 함수
  const addMarker = (position) => {
    const marker = new window.kakao.maps.Marker({
      position
    });
    marker.setMap(map); // 지도에 마커 표시
    return marker;
  };


  // 장소 상세 정보를 커스텀 오버레이로 표시하는 함수
  const displayPlaceInfo = (place) => {

    // 오버레이가 다른 마커를 클릭할 때 사라지도록 설정
    if (placeOverlay) {
      placeOverlay.setMap(null);
    }

    let content = `<div class="placeinfo">
        <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">
        ${place.place_name}
        </a><span class="close" title="닫기">X</span>`;

    if (place.road_address_name) {
      content += `<span class="overlay-address" title="${place.road_address_name}">${place.road_address_name}</span>
                  <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`;
    } else {
      content += `<span title="${place.address_name}">${place.address_name}</span>`;
    }

    content += `<span class="tel">${place.phone}</span></div><div class="after"></div>`;

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);

    const closeBtn = contentNode.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      placeOverlay.setMap(null); // 오버레이 닫기
  });
  };

  // 카테고리 클릭 시 호출되는 함수
  const onClickCategory = (id) => {
    if (currCategory === id) {
      clearMarkers();
      setCurrCategory(''); // 동일 카테고리 클릭 시 해제
    } else {
      setCurrCategory(id); // 새로운 카테고리 선택
    }
  };

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '450px' }}></div>
      <div className='map-category-container'>
        <ul className="map-category-list">
          {categories.map((category) => (
            <li
              key={category.id}
              id={category.id}
              className={`map-category-item ${currCategory === category.id ? 'on' : ''}`}
              onClick={() => onClickCategory(category.id)}
            >
              <span className={`map-category_bg ${category.iconClass}`}></span>
              {category.name}
            </li>
          ))}
        </ul>
        {/* <div>
          <img src='/src/images/icon/arrow-again.svg' className='map-search-again'/>
        </div> */}
      </div>
    </div>
  );
}

export default AroundMap;
