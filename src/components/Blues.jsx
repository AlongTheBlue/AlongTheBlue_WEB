import React, { useEffect, useRef } from 'react';
import "../styles/Blues.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const popularBlues = [
    { name: '함덕해수욕장', url: '/src/images/course/jeju.jpg' },
    { name: '협재해수욕장', url:'/src/images/course/jeju2.jpg'},
    { name: '용머리해안', url: '/src/images/course/jeju3.jpg' },
    { name: '중문색달해수욕장', url: '/src/images/course/jeju4.jpg' }
];

const Blues = ({ jejuBlues, seogwipoBlues }) => {
    const navigate = useNavigate();

    const mapRef = useRef(null); // 지도 객체를 참조할 ref
    const overlayRefsJeju = useRef([]); // 제주 해변의 오버레이 관리
    const overlayRefsSeogwipo = useRef([]); // 서귀포 해변의 오버레이 관리
    const [selectedCity, setSelectedCity] = useState('jeju'); // 현재 선택된 도시
    const [selectedBlue, setSelectedBlue] = useState(null); // 선택된 해변을 저장하는 state 추가
    
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

        // 제주 해변 마커 및 오버레이 생성
        jejuBlues.forEach((location, index) => {
            const markerPosition = new kakao.maps.LatLng(location.yMap, location.xMap); // 각 위치의 좌표 설정

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

            overlayRefsJeju.current[index] = overlay; // 제주 해변 오버레이를 배열로 관리

            // 마커에 클릭 이벤트를 추가하여 커스텀 오버레이를 표시
            kakao.maps.event.addListener(marker, 'click', () => {
                // 모든 오버레이를 닫기
                overlayRefsJeju.current.forEach((ov) => ov.setMap(null));
                overlayRefsSeogwipo.current.forEach((ov) => ov.setMap(null));

                // 클릭한 마커의 오버레이를 열기
                overlay.setMap(mapRef.current);

                setSelectedBlue(location);
            });
        });

        // 서귀포 해변 마커 및 오버레이 생성
        seogwipoBlues.forEach((location, index) => {
            const markerPosition = new kakao.maps.LatLng(location.yMap, location.xMap); // 각 위치의 좌표 설정

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

            overlayRefsSeogwipo.current[index] = overlay; // 서귀포 해변 오버레이를 배열로 관리

            // 마커에 클릭 이벤트를 추가하여 커스텀 오버레이를 표시
            kakao.maps.event.addListener(marker, 'click', () => {
                // 모든 오버레이를 닫기
                overlayRefsJeju.current.forEach((ov) => ov.setMap(null));
                overlayRefsSeogwipo.current.forEach((ov) => ov.setMap(null));

                // 클릭한 마커의 오버레이를 열기
                overlay.setMap(mapRef.current);
                setSelectedBlue(location);
            });
        });
    }, [jejuBlues, seogwipoBlues]);

    // 특정 해변 클릭 시 지도를 이동시키고 확대하며 오버레이를 띄우는 함수
    const handleBeachClick = (beach, index, city) => {
        const { kakao } = window;
        const moveLatLon = new kakao.maps.LatLng(beach.yMap, beach.xMap); // 클릭한 해변의 좌표로 설정
        setSelectedBlue(beach); // 해변 선택

        mapRef.current.setLevel(5); // 지도의 확대 수준을 더 크게 설정 (5레벨)
        mapRef.current.setCenter(moveLatLon); // 지도의 중심을 해당 좌표로 이동

        // 모든 오버레이를 닫기
        overlayRefsJeju.current.forEach((ov) => ov.setMap(null));
        overlayRefsSeogwipo.current.forEach((ov) => ov.setMap(null));

        // 해당 마커의 오버레이 열기 (도시에 따라 다르게 처리)
        if (city === 'jeju') {
            overlayRefsJeju.current[index].setMap(mapRef.current);
        } else if (city === 'seogwipo') {
            overlayRefsSeogwipo.current[index].setMap(mapRef.current);
        }
    };

    const handleBluesPlan = () => {
        if (selectedBlue) {
            navigate(`/along/blues/${selectedBlue.id}`);
        } else {
            alert('해변을 선택해주세요.');
        }
    };


    // 현재 선택된 도시에 따라 해변 리스트 필터링
    const filteredBeaches = selectedCity === 'jeju' ? jejuBlues : seogwipoBlues;
    const city = selectedCity;

    return (
        <div className='blues-container'>
            <div className="blues-list-container">
                {/* 도시 선택 드롭다운 */}
                <div className="dropdown-container">
                    <div className='city-container'>
                        <div 
                            className={`selector-item ${selectedCity === 'jeju' ? 'selector-item--active' : ''}`} 
                            onClick={() => setSelectedCity('jeju')}
                        >
                            제주시
                        </div>
                        <div 
                            className={`selector-item ${selectedCity === 'seogwipo' ? 'selector-item--active' : ''}`} 
                            onClick={() => setSelectedCity('seogwipo')}
                        >
                            서귀포시
                        </div>
                    </div>
                    <button className='select-blue' onClick={handleBluesPlan}>선택</button>
                </div>

                {/* 선택된 도시에 따라 해변 리스트를 출력 */}
                <div className="blues-list">
                    <ul className="blues-list-grid">
                        {filteredBeaches.map((beach, index) => (
                            <li 
                                key={index} 
                                onClick={() => handleBeachClick(beach, index, city)} // 클릭 시 지도를 이동 및 확대하고 오버레이도 표시
                            >
                                {beach.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div id="map" className='blues-map'></div>
            <div className='popular-blues-container'>
                <div className='popular-blues-text'>추천 해변</div>
                <div className="popular-blues-list">
                    {popularBlues.map((popularBlue, index) => (
                    <div key={index} className="popular-blues">
                        <img src={popularBlue.url} alt={popularBlue.name} className="popular-blues-image" />
                        <div className='popular-blues-name'>{popularBlue.name}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blues;
