import React, { useEffect, useState, useRef } from 'react';
import "../styles/AroundMap.css"; // 스타일은 여기에 추가합니다.

function AroundMap() {
  const [position, setPosition] = useState(null); // 현재 위치 상태 관리
  const [placeOverlay, setPlaceOverlay] = useState(null); // 커스텀 오버레이 상태 관리
  const [contentNode, setContentNode] = useState(null); // 오버레이 콘텐츠 노드 관리
  const [currCategory, setCurrCategory] = useState(''); // 현재 선택된 카테고리

  // Ref로 map, placesService, markers를 관리
  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);
  const markersRef = useRef([]); // 마커 배열을 Ref로 관리
  const currCategoryRef = useRef(currCategory);

  const categories = [
    { id: 'AT4', name: '관광', iconClass: 'restaurant' },
    { id: 'AD5', name: '숙박', iconClass: 'cafe' },
    { id: 'FD6', name: '음식', iconClass: 'hospital' },
    { id: 'CE7', name: '카페', iconClass: 'pharmacy' }
  ]; // 카테고리 리스트

  // currCategory가 변경될 때마다 ref 업데이트
  useEffect(() => {
    currCategoryRef.current = currCategory;
  }, [currCategory]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      });
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  }, []);

  // 지도 초기화 및 idle 이벤트 등록 (map은 한 번만 초기화)
  useEffect(() => {
    if (position && !mapRef.current) {
      console.log("Initializing map...");

      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(position.lat, position.lng),
        level: 4, // 지도 확대 레벨
      };

      // Kakao Map 초기화
      const kakaoMap = new window.kakao.maps.Map(container, options);
      mapRef.current = kakaoMap;

      // Kakao Places 서비스 초기화
      const ps = new window.kakao.maps.services.Places(kakaoMap);
      placesServiceRef.current = ps;

      // 커스텀 오버레이 생성 및 설정
      const overlayNode = document.createElement('div');
      overlayNode.className = 'placeinfo_wrap';
      setContentNode(overlayNode);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayNode,
        zIndex: 1,
      });
      setPlaceOverlay(customOverlay);

      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 줌 컨트롤러 추가

      // idle 이벤트 등록 (지도의 중심 좌표가 변경될 때)
      window.kakao.maps.event.addListener(kakaoMap, 'idle', () => {
        const center = kakaoMap.getCenter(); // 지도의 중심 좌표
        console.log("Map idle, updating center position:", center);
        setPosition({
          lat: center.getLat(),
          lng: center.getLng(),
        });

        // 지도 이동 후에도 마커를 최신 상태로 업데이트
        if (currCategoryRef.current) {
          console.log("Map moved, updating places for current category...");
          searchPlaces(center); // 최신 지도 중심에 대한 장소 검색
        }
      });
    }
  }, [position]); // map은 한 번만 생성되므로 의존성 배열에서 map을 제거

  // 카테고리가 변경될 때마다 장소를 다시 검색
  useEffect(() => {
    if (mapRef.current && currCategory) {
      console.log("Category changed, updating places...");
      clearUnusedMarkers(); // 기존 마커 중 중복되지 않는 마커를 유지
      searchPlaces(mapRef.current.getCenter()); // 최신 지도 중심 좌표를 사용해 검색
    }
  }, [currCategory]);

  // 기존 마커 중 필요 없는 마커를 제거하는 함수
  const clearUnusedMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null); // 각 마커를 지도에서 제거
    });
    markersRef.current = []; // 마커 배열 초기화
  };

  // 장소를 지도에 마커로 표시하는 함수 (중복 마커 제거)
  const displayPlaces = (places) => {
    const existingMarkerPositions = new Set(
      markersRef.current.map((marker) => `${marker.getPosition().getLat()},${marker.getPosition().getLng()}`)
    );

    const newMarkers = places
      .filter((place) => {
        const positionKey = `${place.y},${place.x}`;
        return !existingMarkerPositions.has(positionKey); // 중복되지 않는 새로운 마커만 추가
      })
      .map((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = addMarker(markerPosition);

        // 마커 클릭 이벤트 등록
        window.kakao.maps.event.addListener(marker, 'click', () => {
          displayPlaceInfo(place);
        });

        return marker;
      });

    // 새로 생성된 마커들을 markersRef에 추가
    markersRef.current = [...markersRef.current, ...newMarkers];
  };

  // 마커를 생성하고 지도에 표시하는 함수
  const addMarker = (position) => {
    const marker = new window.kakao.maps.Marker({
      position,
    });
    marker.setMap(mapRef.current); // 지도에 마커 표시
    return marker;
  };

  // 카테고리 검색 함수
  const searchPlaces = (center) => {
    console.log(center);
    if (!currCategoryRef.current || !mapRef.current || !placesServiceRef.current) return;

    // 커스텀 오버레이 숨기기
    if (placeOverlay) {
      placeOverlay.setMap(null);
    }

    // 카테고리로 장소 검색
    placesServiceRef.current.categorySearch(
      currCategoryRef.current,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          displayPlaces(data); // 중복 마커를 필터링한 후 마커를 추가
        }
      },
      { location: center, radius: 5000 }
    );
  };

  // 장소 상세 정보를 커스텀 오버레이로 표시하는 함수
  const displayPlaceInfo = (place) => {
    if (placeOverlay) {
      placeOverlay.setMap(null); // 오버레이 숨기기
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
    placeOverlay.setMap(mapRef.current);

    const closeBtn = contentNode.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      placeOverlay.setMap(null); // 오버레이 닫기
    });
  };

  // 카테고리 클릭 시 호출되는 함수
  const onClickCategory = (id) => {
    if (currCategory === id) {
      clearUnusedMarkers(); // 동일 카테고리 클릭 시 기존 마커 제거
      setCurrCategory(''); // 카테고리 해제
    } else {
      setCurrCategory(id); // 새로운 카테고리 선택
    }
  };

  return (
    <div className="map-container">
      <div id="map" style={{ width: '100%', height: '450px' }}></div>
      <div className="map-category-container">
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
      </div>
    </div>
  );
}

export default AroundMap;
