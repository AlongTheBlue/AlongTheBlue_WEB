import React, { useState } from "react";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // useLocation 추가
import "../styles/Page.css";
import AroundMap from "../components/AroundMap";
import TravelCoursesList from "../components/TravelCoursesList";
import axios from "axios";

const AlongBluesPlan = () => {
  const { id } = useParams();
  const location = useLocation(); // useLocation을 사용해 전달된 상태를 가져옴
  const { selectedBlue } = location.state || {}; // 전달된 selectedBlue 상태

  const [keyword, setKeyword] = useState(""); // 검색어 상태 관리
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [travelCourses, setTravelCourses] = useState([]);
  const nav = useNavigate();
  // 전달된 바다 정보를 사용해 초기값 설정
  const blue = selectedBlue || {
    name: "기본 해수욕장", // 기본 값 (선택된 바다가 없을 경우)
    xMap: "126.4531570913",
    yMap: "33.4974183784",
    address: "기본 주소",
    category: "관광",
    iconCategory: "tourData",
  };

  const API_BASE_URL = "https://alongtheblue.site/api";

  const saveTravelCourses = async () => {
    try {
      const postData = {
        id,
        title: selectedBlue.title,
        blueItems: travelCourses.map((course, index) => ({
          id: index,
          title: index === 0 ? selectedBlue.title : course.name,
          address: course.address,
          x: course.lat,
          y: course.lng,
          category: course.category,
        })),
      };

      console.log("전송할 데이터:", postData);
      console.log("blueItems:", postData.blueItems);
      const response = await axios.post(
        `${API_BASE_URL}/blueCourse/create`,
        postData
      );

      if (response.status === 200) {
        alert("여행 코스가 성공적으로 저장되었습니다.");
        nav("/my");
      } else {
        alert("저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page-container">
      <PageHeader title={`바당따라 - ${blue.title}`} />
      <AroundMap
        keyword={keyword}
        searchTrigger={searchTrigger}
        selectedBlue={blue}
        travelCourses={travelCourses}
        setTravelCourses={setTravelCourses}
      />
      <TravelCoursesList
        travelCourses={travelCourses}
        setTravelCourses={setTravelCourses}
      />
      <div className="travel-courses-save">
        <button className="travel-courses-save-btn" onClick={saveTravelCourses}>
          저장하기
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AlongBluesPlan;
