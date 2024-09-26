import React, { useEffect, useRef } from 'react';
import "../styles/Blues.css";
import { useState } from 'react';

const Blues = ({ jejuBlues, seogwipoBlues }) => {
    const mapRef = useRef(null); // 지도 객체를 참조할 ref
    const overlayRefs = useRef([]); // 오버레이를 관리할 ref 배열
    const [selectedCity, setSelectedCity] = useState('jeju'); // 현재 선택된 도시


    useEffect(() => {
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

        // 마커와 커스텀 오버레이를 배열에서 받아온 좌표로 생성합니다.
        [...jejuBlues, ...seogwipoBlues].forEach((location, index) => {
            const markerPosition = new kakao.maps.LatLng(location.yMap, location.xMap); // 각 위치의 좌표 설정

             // 마커 이미지 설정
             const markerImageSrc = "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png"; // 마커 이미지 URL
             const imageSize = new kakao.maps.Size(20, 28); // 마커 크기 설정 (가로 24px, 세로 35px)
             const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize); // 마커 이미지 객체 생성
 
             const marker = new kakao.maps.Marker({
                 map: mapRef.current,
                 position: markerPosition, // 마커를 표시할 위치
                 image: markerImage // 마커 이미지 설정
             });
            
            // const marker = new kakao.maps.Marker({
            //     map: mapRef.current,
            //     position: markerPosition // 마커를 표시할 위치
            // });

            // 커스텀 오버레이 내용 정의
            const content = 
                `<div class="blue-overlay">
                    <span class="blue-name">${location.name}</span>
                </div>
                <div class="triangle"></div>`
            ;

            // 커스텀 오버레이 생성
            const overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: markerPosition,
                yAnchor: 1.5, // 오버레이의 위치 조정을 위한 값
                xAnchor: 0.5
            });

            overlayRefs.current[index] = overlay; // 오버레이를 배열로 관리

            // 마커에 클릭 이벤트를 추가하여 커스텀 오버레이를 표시
            kakao.maps.event.addListener(marker, 'click', () => {
                // 모든 오버레이를 닫기
                overlayRefs.current.forEach((ov) => ov.setMap(null));

                // 클릭한 마커의 오버레이를 열기
                overlay.setMap(mapRef.current);
            });

            kakao.maps.event.addListener(mapRef.current, 'idle', () => {
                overlayRefs.current.forEach((ov) => ov.setMap(null));
            });
        });
    }, []);

    // 현재 선택된 도시에 따라 해변 리스트 필터링
    const filteredBeaches = selectedCity === 'jeju' ? jejuBlues : seogwipoBlues;


    return (
        <div className='blues-container'>
            <div id="map" className='blues-map'></div>
            
            <div className="beach-list-container">
                {/* 도시 선택 드롭다운 */}
                <div className="dropdown-container">
                    <label htmlFor="citySelect" className="dropdown-label">
                        <img className="arrow-icon" src='../src/images/icon/arrow_down.svg'></img> {selectedCity === 'jeju' ? '제주시' : '서귀포시'}
                    </label>
                    <select
                        id="citySelect"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="city-dropdown"
                    >
                        <option value="jeju">제주시</option>
                        <option value="seogwipo">서귀포시</option>
                    </select>
                </div>

                {/* 선택된 도시에 따라 해변 리스트를 출력 */}
                <div className="beach-list">
                    <ul className="grid-list">
                        {filteredBeaches.map((beach, index) => (
                            <li key={index}>{beach.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                선택하기
            </button>
        </div>
    );
};

export default Blues;