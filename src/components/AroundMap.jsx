import React, { useEffect, useState, useRef } from "react";
import "../styles/AroundMap.css"; // 스타일은 여기에 추가합니다.

function AroundMap({
  keyword,
  searchTrigger,
  selectedBlue,
  travelCourses,
  setTravelCourses,
}) {
  const [position, setPosition] = useState(null); // 현재 위치 상태 관리
  const [currCategory, setCurrCategory] = useState(""); // 현재 선택된 카테고리
  const [place, setPlace] = useState(null);
  const [paths, setPaths] = useState([]);
  const [travelMarkers, setTravelMarkers] = useState([]);

  // Ref로 map, placesService, markers, placeOverlay, contentNode를 관리
  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);
  const markersRef = useRef([]); // 마커 배열을 Ref로 관리
  const placeOverlayRef = useRef(null); // placeOverlay를 Ref로 관리
  const contentNodeRef = useRef(null); // 오버레이 콘텐츠 노드를 Ref로 관리
  const currCategoryRef = useRef(currCategory);

  const overNodeRef = useRef(null);
  const infoOverlayRef = useRef(null);

  useEffect(() => {
    if (selectedBlue) {
      setPaths([
        new window.kakao.maps.LatLng(selectedBlue.yMap, selectedBlue.xMap),
      ]);
    }
  }, []);

  const categories = [
    { id: "AT4", name: "관광", url: "/images/icon/category_6.svg" },
    { id: "AD5", name: "숙박", url: "/images/icon/category_7.svg" },
    { id: "FD6", name: "음식", url: "/images/icon/category_8.svg" },
    { id: "CE7", name: "카페", url: "/images/icon/category_9.svg" },
  ]; // 카테고리 리스트

  useEffect(() => {
    const ps = placesServiceRef.current;
    const map = mapRef.current;

    if (ps && map) {
      clearUnusedMarkers();
      if (currCategory !== "") {
        setCurrCategory(""); // 카테고리를 초기화
      }
      searchKeyword(keyword, ps, map);
    }
  }, [searchTrigger]);

  const searchKeyword = (keyword, ps) => {
    if (placeOverlayRef.current) {
      placeOverlayRef.current.setMap(null);
    }

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(data);
          displayPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      },
      {
        useMapCenter: true,
        useMapBounds: true,
        sort: window.kakao.maps.services.SortBy.ACCURACY,
      }
    );
  };

  // currCategory가 변경될 때마다 ref 업데이트
  useEffect(() => {
    currCategoryRef.current = currCategory;
  }, [currCategory]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (selectedBlue) {
      setTravelCourses([
        {
          title: selectedBlue.name,
          address: selectedBlue.address,
          lat: selectedBlue.yMap,
          lng: selectedBlue.xMap,
          category: selectedBlue.category,
          iconCategory: selectedBlue.iconCategory,
        },
      ]);

      setPosition({ lat: selectedBlue.yMap, lng: selectedBlue.xMap });
    } else if (navigator.geolocation) {
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

      const container = document.getElementById("map");
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
      const overlayNode = document.createElement("div");
      overlayNode.className = "placeinfo_wrap";
      contentNodeRef.current = overlayNode; // Ref로 오버레이 콘텐츠 노드를 관리

      // placeOverlay를 Ref로 관리
      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayNode,
        zIndex: 1,
      });
      placeOverlayRef.current = customOverlay;

      // 커스텀 오버레이 생성 및 설정
      const infolayNode = document.createElement("div");
      infolayNode.className = "over-info-wrap";
      overNodeRef.current = infolayNode; // Ref로 오버레이 콘텐츠 노드를 관리

      // placeOverlay를 Ref로 관리
      const infoOverlay = new window.kakao.maps.CustomOverlay({
        content: infolayNode,
        zIndex: 1,
      });
      infoOverlayRef.current = infoOverlay;

      // 줌 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 줌 컨트롤러 추가

      // idle 이벤트 등록 (지도의 중심 좌표가 변경될 때)
      window.kakao.maps.event.addListener(kakaoMap, "idle", () => {
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

  // 여행 코스가 변경될 때마다 마커를 순차적으로 표시
  useEffect(() => {
    if (mapRef.current) {
      // travelCourses가 채워져있을 때 실행
      displayCourseMarkers(travelCourses, mapRef.current);
      setPaths(
        travelCourses.map(
          (course) => new window.kakao.maps.LatLng(course.lat, course.lng)
        )
      );
    }
  }, [travelCourses]);

  // 여행 코스를 기반으로 마커 생성 함수
  const displayCourseMarkers = (courses, map) => {
    // 기존 마커들을 모두 제거
    travelMarkers.forEach((marker) => marker.setMap(null));

    // 새 마커를 생성하고 배열에 저장
    const newMarkers = courses.map((course, index) => {
      const markerPosition = new window.kakao.maps.LatLng(
        course.lat,
        course.lng
      );
      const markerImageSrc = `/images/icon/marker/${course.iconCategory}_${
        index + 1
      }.svg`;
      const imageSize = new window.kakao.maps.Size(30, 45);
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        imageSize,
        { spriteSize: new window.kakao.maps.Size(25, 50) }
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      marker.setMap(map); // 마커를 지도에 표시
      return marker; // 생성된 마커 반환
    });

    setTravelMarkers(newMarkers);
  };

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
      markersRef.current.map(
        (marker) =>
          `${marker.getPosition().getLat()},${marker.getPosition().getLng()}`
      )
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
        window.kakao.maps.event.addListener(marker, "click", () => {
          closeOverInfo();
          displayPlaceInfo(place); // 클릭 시 오버레이를 표시
          console.log(
            "name: " + place.place_name + " x: " + place.x + " y: " + place.y
          );
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          displayOverInfo(place);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          closeOverInfo();
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
    if (
      !currCategoryRef.current ||
      !mapRef.current ||
      !placesServiceRef.current
    )
      return;

    // 커스텀 오버레이 숨기기
    if (placeOverlayRef.current) {
      placeOverlayRef.current.setMap(null);
    }

    // 카테고리로 장소 검색
    placesServiceRef.current.categorySearch(
      currCategoryRef.current,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          displayPlaces(data); // 중복 마커를 필터링한 후 마커를 추가
        }
      },
      { location: center, radius: 20000 }
    );
  };

  // 장소 상세 정보를 커스텀 오버레이로 표시하는 함수
  const displayPlaceInfo = (place) => {
    // 오버레이가 정의되지 않은 상태에서는 작동하지 않도록 예외 처리
    if (!contentNodeRef.current) {
      console.error("contentNode is not initialized.");
      return;
    }

    // 기존 오버레이가 남아 있을 경우 닫기
    if (placeOverlayRef.current) {
      placeOverlayRef.current.setMap(null); // 기존 오버레이를 숨기기
    }

    // 오버레이 콘텐츠 설정
    let content = 
    `<div class="placeinfo-container">
        <div class="placeinfo-header">
          <a class="placeinfo-title" href="${place.place_url}" target="_blank" title="${place.place_name}">
            ${place.place_name}
          </a>
          <div class="placeinfo-close" title="닫기">X</div>
        </div>
        <div class="placeinfo-main">
          <div class="placeinfo-text">;

    if (place.road_address_name) {
      content += <div class="placeinfo-address" title="${place.road_address_name}">${place.road_address_name}</div>
                  <div class="placeinfo-jibun" title="${place.address_name}">(지번 : ${place.address_name})</div>;
    } else {
      content += <div class="placeinfo-address" title="${place.address_name}">${place.address_name}</div>;
    }

    content += <div class="placeinfo-detail">
                  <div class="placeinfo-tel">${place.phone}</div>
                  <a class="placeinfo-link" href="${place.place_url}" target="_blank" title="${place.place_name}">상세보기</a>
                </div>                
                </div>
              </div>
              </div><div class="after"></div>`;

    // 오버레이 내용 업데이트 및 위치 설정
    contentNodeRef.current.innerHTML = content; // Ref로 관리되는 contentNode에 콘텐츠 설정
    placeOverlayRef.current.setContent(contentNodeRef.current); // 오버레이 콘텐츠 업데이트
    placeOverlayRef.current.setPosition(
      new window.kakao.maps.LatLng(place.y, place.x)
    );
    placeOverlayRef.current.setMap(mapRef.current); // 오버레이를 지도에 표시

    // 오버레이 닫기 이벤트 등록
    const closeBtn = contentNodeRef.current.querySelector(".placeinfo-close");
    closeBtn.addEventListener("click", () => {
      placeOverlayRef.current.setMap(null); // 오버레이 닫기
    });
    setPlace(place);
  };

  // 카테고리 클릭 시 호출되는 함수
  const onClickCategory = (id) => {
    if (currCategory === id) {
      clearUnusedMarkers(); // 동일 카테고리 클릭 시 기존 마커 제거
      setCurrCategory(""); // 카테고리 해제
    } else {
      setCurrCategory(id); // 새로운 카테고리 선택
    }
  };

  // 마우스 올리면 오버레이 표시
  const displayOverInfo = (place) => {
    // 오버레이가 정의되지 않은 상태에서는 작동하지 않도록 예외 처리
    if (!overNodeRef.current) {
      return;
    }

    // 기존 오버레이가 남아 있을 경우 닫기
    if (infoOverlayRef.current) {
      infoOverlayRef.current.setMap(null); // 기존 오버레이를 숨기기
    }

    // 오버레이 콘텐츠 설정
    let content = <div class="over-info-text">${place.place_name}</div>;

    // 오버레이 내용 업데이트 및 위치 설정
    overNodeRef.current.innerHTML = content; // Ref로 관리되는 contentNode에 콘텐츠 설정
    infoOverlayRef.current.setContent(overNodeRef.current); // 오버레이 콘텐츠 업데이트
    infoOverlayRef.current.setPosition(
      new window.kakao.maps.LatLng(place.y, place.x)
    );
    infoOverlayRef.current.setMap(mapRef.current); // 오버레이를 지도에 표시
  };

  const closeOverInfo = () => {
    if (!infoOverlayRef) return;
    infoOverlayRef.current.setMap(null); // 오버레이 닫기
  };

  const addCourse = () => {
    const selectedPlace = place;

    // 이미 존재하는 코스인지 확인하여 중복 방지
    const isDuplicate = travelCourses.some(
      (course) =>
        course.lat === selectedPlace.y && course.lng === selectedPlace.x
    );
    if (isDuplicate) {
      alert("이미 추가한 장소입니다.");
      return;
    }
    let place_category = selectedPlace.category_group_name;
    let icon_category = null;
    if (place_category == "관광명소") {
      place_category = "관광";
      icon_category = "tourData";
    } else if (place_category == "숙박") {
      icon_category = "accommodation";
    } else if (place_category == "음식점") {
      place_category = "음식";
      icon_category = "restaurant";
    } else {
      icon_category = "cafe";
    }
    console.log(place_category);

    const course = {
      lat: selectedPlace.y,
      lng: selectedPlace.x,
      name: selectedPlace.place_name,
      address: selectedPlace.road_address_name || selectedPlace.address_name,
      category: place_category,
      iconCategory: icon_category,
    };

    // 상태를 업데이트하는 부분은 중복되지 않을 때만 수행
    setTravelCourses((prevCourses) => [...prevCourses, course]);

    // setTravelCourses((prevCourses) => [...prevCourses, course]);
    // setPaths((prevPaths) => [
    //   ...prevPaths,
    //   new window.kakao.maps.LatLng(course.lat, course.lng)
    // ]);

    if (placeOverlayRef.current) {
      placeOverlayRef.current.setMap(null); // 오버레이 닫기
    }
    clearUnusedMarkers(); // 기존 마커 정리
    setCurrCategory(""); // 카테고리 초기화
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    let polyline = new window.kakao.maps.Polyline({
      path: paths, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 3, // 선의 두께 입니다
      strokeColor: "#5C5C5C", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(mapRef.current);
    console.log(paths);

    // 메모리 누수를 방지하기 위해 polyline을 정리
    return () => {
      polyline.setMap(null);
    };
  }, [paths]);

  return (
    <div className="map-container">
      <div id="map" className="around-map"></div>
      <div className="map-category-container">
        <ul className="map-category-list">
          {categories.map((category) => (
            <li
              key={category.id}
              id={category.id}
              className={`map-category-item ${
                currCategory === category.id ? "on" : ""
              }`}
              onClick={() => onClickCategory(category.id)}
            >
              <img className="map-category_bg" src={category.url}></img>
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {selectedBlue && (
        <div className="add-box">
          <img
            className="add-btn"
            src="/images/icon/add_btn3.svg"
            onClick={addCourse}
          ></img>
        </div>
      )}
    </div>
  );
}

export default AroundMap;