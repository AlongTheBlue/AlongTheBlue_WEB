import React, { useEffect, useRef, useState } from "react";
import "../styles/Blues.css";
import { useNavigate } from "react-router-dom";
import { getRecommendBlues } from "../utils/data";

// const recommendBlues = [
//   { name: "함덕해수욕장", url: "/images/course/jeju.jpg" },
//   { name: "협재해수욕장", url: "/images/course/jeju2.jpg" },
//   { name: "용머리해안", url: "/images/course/jeju3.jpg" },
//   { name: "중문색달해수욕장", url: "/images/course/jeju4.jpg" },
// ];

const Blues = ({ jejuBlues, seogwipoBlues, onSelect }) => {
  const navigate = useNavigate();
  const mapRef = useRef(null); // 지도 객체를 참조할 ref
  const overlayRefsJeju = useRef([]); // 제주 해변의 오버레이 관리
  const overlayRefsSeogwipo = useRef([]); // 서귀포 해변의 오버레이 관리
  const selectedOverlayRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("jeju"); // 현재 선택된 도시
  const [selectedBlue, setSelectedBlue] = useState(null); // 선택된 해변을 저장하는 state 추가
  const [recommendBlues, setRecommendBlues] = useState([]);

  useEffect(() => {
    const { kakao } = window;

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.386666, 126.55667),
      level: 10,
    };

    mapRef.current = new kakao.maps.Map(mapContainer, mapOption);

    const zoomControl = new kakao.maps.ZoomControl();
    mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const createMarkerAndOverlay = (location, index, overlayRefs) => {
      const markerPosition = new kakao.maps.LatLng(
        location.yMap,
        location.xMap
      );
      const markerImageSrc =
        "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png";
      const imageSize = new kakao.maps.Size(20, 28);
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: markerPosition,
        image: markerImage,
      });

      const content = `
                <div class="blue-overlay">
                    <span class="blue-name">${location.title}</span>
                </div>
                <div class="triangle"></div>
            `;

      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: markerPosition,
        yAnchor: 1.5,
        xAnchor: 0.5,
      });

      overlayRefs.current[index] = overlay;

      kakao.maps.event.addListener(marker, "click", () => {
        overlayRefsJeju.current.forEach((ov) => ov.setMap(null));
        overlayRefsSeogwipo.current.forEach((ov) => ov.setMap(null));

        overlay.setMap(mapRef.current);
        setSelectedBlue(location);
        selectedOverlayRef.current = overlay;
      });

      kakao.maps.event.addListener(marker, "mouseover", () => {
        overlay.setMap(mapRef.current);
      });

      kakao.maps.event.addListener(marker, "mouseout", () => {
        overlayRefsJeju.current.forEach((ov) => {
          if (ov !== selectedOverlayRef.current) ov.setMap(null);
        });
        overlayRefsSeogwipo.current.forEach((ov) => {
          if (ov !== selectedOverlayRef.current) ov.setMap(null);
        });
      });
    };

    // 제주 해변 마커 및 오버레이 생성
    jejuBlues.forEach((location, index) =>
      createMarkerAndOverlay(location, index, overlayRefsJeju)
    );

    // 서귀포 해변 마커 및 오버레이 생성
    seogwipoBlues.forEach((location, index) =>
      createMarkerAndOverlay(location, index, overlayRefsSeogwipo)
    );
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
    if (city === "jeju") {
      overlayRefsJeju.current[index].setMap(mapRef.current);
    } else if (city === "seogwipo") {
      overlayRefsSeogwipo.current[index].setMap(mapRef.current);
    }
  };

  const handleBluesPlan = () => {
    if (selectedBlue) {
      const updatedBlue = {
        ...selectedBlue,
        category: "관광",
        iconCategory: "tourData",
      };

      // 선택된 해변 정보 전달 및 페이지 이동
      onSelect(updatedBlue);
      // navigate(`/along/blues/plan/${updatedBlue.id}`, {
        // state: { selectedBlue: updatedBlue },
      // });
    } else {
      alert("해변을 선택해주세요.");
    }
  };

  // 현재 선택된 도시에 따라 해변 리스트 필터링
  const filteredBeaches = selectedCity === "jeju" ? jejuBlues : seogwipoBlues;
  const city = selectedCity;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendBlues();
        setRecommendBlues(data);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="blues-container">
      <div className="blues-list-container">
        {/* 도시 선택 드롭다운 */}
        <div className="dropdown-container">
          <div className="city-container">
            <div
              className={`selector-item ${
                selectedCity === "jeju" ? "selector-item--active" : ""
              }`}
              onClick={() => setSelectedCity("jeju")}
            >
              제주시
            </div>
            <div
              className={`selector-item ${
                selectedCity === "seogwipo" ? "selector-item--active" : ""
              }`}
              onClick={() => setSelectedCity("seogwipo")}
            >
              서귀포시
            </div>
          </div>
          <button className="select-blue" onClick={handleBluesPlan}>
            선택
          </button>
        </div>

        {/* 선택된 도시에 따라 해변 리스트를 출력 */}
        <div className="blues-list">
          <ul className="blues-list-grid">
            {filteredBeaches.map((beach, index) => (
              <li
                key={index}
                onClick={() => handleBeachClick(beach, index, city)} // 클릭 시 지도를 이동 및 확대하고 오버레이도 표시
              >
                {beach.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="map" className="blues-map"></div>
      <div className="popular-blues-container">
        <div className="popular-blues-text">추천 해변</div>
        <div className="popular-blues-list">
          {recommendBlues.map((recommendBlue, index) => (
            <div key={index} className="popular-blues" onClick={() => handleBeachClick(recommendBlue, index, recommendBlue.city)}>
              <img
                src={recommendBlue.image}
                alt={recommendBlue.title}
                className="popular-blues-image"
              />
              <div className="popular-blues-name">{recommendBlue.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blues;
