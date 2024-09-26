import React, { useState, useEffect, useRef } from 'react';
import "../styles/BluesPlan.css";

const blue = { 
    id: 11,
    name: "이호테우해수욕장", 
    xMap: "126.4531570913", 
    yMap: "33.4974183784" 
};

const BluesPlan = () => {
    const [selectedBlue, setSelectedBlue] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        // selectedBlue를 한 번만 설정합니다.
        setSelectedBlue(blue);  
    }, []);

    useEffect(() => {
        // selectedBlue가 설정되지 않은 상태라면 지도 렌더링을 하지 않습니다.
        if (!selectedBlue) return; 

        const { kakao } = window;

        // 지도를 표시할 div를 가져옵니다.
        const mapContainer = document.getElementById('map'); 
        const mapOption = {
            center: new kakao.maps.LatLng(33.386666, 126.55667), // 제주도 중심 좌표
            level: 10 // 지도 확대 레벨
        };

        // 지도 객체를 생성합니다.
        mapRef.current = new kakao.maps.Map(mapContainer, mapOption);

        // 줌 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        mapRef.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 줌 컨트롤러 추가

        const markerPosition = new kakao.maps.LatLng(selectedBlue.yMap, selectedBlue.xMap); // 마커의 위치 좌표 설정

        // 마커 이미지 설정
        const markerImageSrc = "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png"; // 마커 이미지 URL
        const imageSize = new kakao.maps.Size(20, 28); // 마커 크기 설정
        const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize); // 마커 이미지 객체 생성

        const marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: markerPosition, // 마커를 표시할 위치
            image: markerImage // 마커 이미지 설정
        });

        // 커스텀 오버레이 내용 정의
        const content = 
            `<div class="blue-overlay">
                <span class="blue-name">${selectedBlue.name}</span>
            </div>`
        ;

        // 커스텀 오버레이 생성
        const overlay = new kakao.maps.CustomOverlay({
            content: content,
            position: markerPosition,
            yAnchor: 1.5, // 오버레이의 위치 조정을 위한 값
            xAnchor: 0.5
        });

        // 마커에 클릭 이벤트를 추가하여 커스텀 오버레이를 표시
        kakao.maps.event.addListener(marker, 'click', () => {
            // 클릭한 마커의 오버레이를 열기
            overlay.setMap(mapRef.current);
        });
    }, [selectedBlue]); // selectedBlue가 설정된 후에만 실행

    return (
        <div className='blues-plan-container'>
            <div id="map" className='blues-plan-map'></div>
        </div>
    );
};

export default BluesPlan;
