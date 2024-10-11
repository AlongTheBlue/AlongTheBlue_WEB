import "../styles/DetailMap.css";
import { useEffect, useState } from "react";

function DetailMap({ courseMarkers }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    const { kakao } = window;

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(33.386666, 126.55667),
      level: 8, // 지도 확대 레벨
    };
    
    // 지도 생성 (한 번만 실행)
    const createdMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(createdMap);

    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    createdMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    
  }, []);

  useEffect(() => {
    if (!map) return; // 지도 객체가 아직 생성되지 않았으면 실행하지 않음
    const { kakao } = window;

    // 지도 레벨을 마커가 있는지 여부에 따라 설정
    if (courseMarkers.length === 0) {
        map.setLevel(10); // 마커가 없으면 레벨 10
      } else {
        map.setLevel(8); // 마커가 있으면 레벨 8
      }
    
    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    let newMarkers = [];
    let paths = [];

    // 새 마커 생성
    courseMarkers.forEach((courseMarker, index) => {
      const markerPosition = new window.kakao.maps.LatLng(courseMarker.lat, courseMarker.lng);
      const markerImageSrc = `/images/icon/marker/${courseMarker.iconCategory}_${index + 1}.svg`;
      const imageSize = new window.kakao.maps.Size(30, 45);
      const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, imageSize, { spriteSize: new kakao.maps.Size(25, 50) });

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map); // 마커를 지도에 표시

      newMarkers.push(marker);
      paths.push(new kakao.maps.LatLng(courseMarker.lat, courseMarker.lng));
    });

    // 새 마커들 상태 업데이트
    setMarkers(newMarkers);

    // 기존 선 제거
    if (polyline) {
      polyline.setMap(null);
    }

    // 새로운 선 생성
    const newPolyline = new window.kakao.maps.Polyline({
      path: paths,
      strokeWeight: 3,
      strokeColor: '#5C5C5C',
      strokeOpacity: 1,
      strokeStyle: 'dashed',
    });

    // 선을 지도에 표시
    newPolyline.setMap(map);
    setPolyline(newPolyline);

    // 지도 중심을 마커들의 중앙으로 설정
    if (paths.length > 0) {
      let totalLat = 0, totalLng = 0;
      paths.forEach((path) => {
        totalLat += path.getLat();
        totalLng += path.getLng();
      });

      const centerLat = totalLat / paths.length;
      const centerLng = totalLng / paths.length;

      const coords = new kakao.maps.LatLng(centerLat, centerLng);
      map.setCenter(coords);
    }
  }, [courseMarkers, map]); // courseMarkers나 map이 변경될 때만 실행

  return (
    <div className='detail-map-container'>
      <div id="map" className="detail-map" style={{ width: '37em', height: '25em' }}/>
    </div>
  );
}

export default DetailMap;
