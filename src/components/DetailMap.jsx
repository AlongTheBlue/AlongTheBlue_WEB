import "../styles/DetailMap.css";
import { useEffect } from "react";

function DetailMap({courseMarkers}) {
    useEffect(() => {
        const { kakao } = window;
    
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        const mapOption = {
          center: new kakao.maps.LatLng(33.386666, 126.55667),
          level: 8 // 지도 확대 레벨
        };
        
        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
         
        // 줌 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 줌 컨트롤러 추가
        
        let paths = []
        // 새 마커를 생성하고 배열에 저장
        courseMarkers.map((courseMarker, index) => {
            const markerPosition = new window.kakao.maps.LatLng(courseMarker.lat, courseMarker.lng);
            console.log(markerPosition)
            const markerImageSrc = `/images/icon/marker/${courseMarker.iconCategory}_${index+1}.svg`;
            const imageSize = new window.kakao.maps.Size(30, 45);
            const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, imageSize, 
                { spriteSize: new window.kakao.maps.Size(25, 50) });
  
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
            });
            marker.setMap(map); // 마커를 지도에 표시

            const path = new kakao.maps.LatLng(courseMarker.lat, courseMarker.lng);
            paths = [...paths, path]

            return marker; // 생성된 마커 반환
        });
            
        let polyline = new window.kakao.maps.Polyline({
            path: paths, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 3, // 선의 두께 입니다
            strokeColor: '#5C5C5C', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'dashed' // 선의 스타일입니다
        });
          
        // 지도에 선을 표시합니다 
        polyline.setMap(map);

        let totalLat = 0, totalLng = 0;
        paths.forEach((path) => {
            totalLat += path.getLat();
            totalLng += path.getLng();
        });
        console.log(totalLat)
        console.log(totalLng)

        const centerLat = totalLat / paths.length;
        const centerLng = totalLng / paths.length; 
        
        const coords = new kakao.maps.LatLng(centerLat, centerLng);
        map.setCenter(coords);
      }, []);



    return (
        <div className='detail-map-container'>
            <div id="map" className="detail-map" style={{
                width: '37em',
                height: '25em'
            }}/>
        </div>
    );
}

export default DetailMap;
