import React, { useState, useEffect } from "react";
import "../styles/Page.css";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import UserCard from "../components/UserCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import axios from "axios"; // axios import
import "../styles/AlongCoursesForm.css";

const API_BASE_URL = "https://alongtheblue.site/api";

const AlongCoursesForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 기본 초기 상태
  const defaultCourses = [
    {
      name: "이호테우해수욕장",
      address: "제주특별자치도 제주시 이호일동 1665-13",
      category: "관광",
      iconCategory: "tour",
      introduction: "제주 핫플 해변",
      images: [
        {
          id: 1,
          url: "/images/course/jeju.jpg",
        },
      ],
    },
  ];

  // location.state에서 travelCourses와 selectedPlace 받아오기
  const [travelCourses, setTravelCourses] = useState(() => {
    return location.state?.travelCourses || defaultCourses;
  });
  const [selectedPlace, setSelectedPlace] = useState(
    location.state?.selectedPlace || null
  ); // 선택된 장소

  const [hashtags, setHashtags] = useState(() => [
    "#바다",
    "#이호테우",
    "#해변",
  ]);
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [content, setContent] = useState(localStorage.getItem("content") || "");

  // 검색 페이지로 이동하는 함수 (handleSearchPage)
  const handleSearchPage = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("content", content);

    navigate("/search/place", { state: { travelCourses } });
  };

  // 여행코스 전송
  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tourpost`, {
        title: title,
        content: content,
        hashtags: hashtags,
        travelCourses: travelCourses, // 코스 정보 포함
      });
      if (response.status === 200) {
        alert("여행 코스가 성공적으로 저장되었습니다.");
        navigate("/courses"); // 저장 후 이동할 페이지 경로 설정
      }
    } catch (error) {
      console.error("저장 중 문제가 발생했습니다.", error);
      alert("여행 코스 저장에 실패했습니다.");
    }
  };

  // 컴포넌트가 마운트되었을 때 location.state에서 값을 확인
  useEffect(() => {
    console.log("Location State:", location.state); // location.state 확인
    console.log("Selected Place:", location.state?.selectedPlace); // selectedPlace 확인
  }, [location]);

  // selectedPlace가 업데이트되면 travelCourses에 새 코스를 추가
  useEffect(() => {
    if (selectedPlace == null) return;
    const newCourse = {
      name: selectedPlace.title,
      address: selectedPlace.address,
      category: "음식",
      iconCategory: "food",
      introduction: "선택한 장소",
    };
    setTravelCourses((prevCourses) => [...prevCourses, newCourse]);
  }, [selectedPlace]);

  // travelCourses가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log("Updated travelCourses:", travelCourses);
  }, [travelCourses]);

  return (
    <div className="page-container">
      <PageHeader title={"여행따라"} />
      <div className="along-courses-form-container2">
        <div className="along-courses-form-save" onClick={handleSave}>
          저장
        </div>
        <div className="along-courses-form-container">
          <UserCard />
          <div className="along-courses-form-info">
            <div className="along-courses-form-title">
              <input
                type="text"
                id="title"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="along-courses-form-content">
              <textarea
                id="content"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="hashtags">
              {hashtags.map((hashtag, index) => (
                <span key={index} className="hashtag">
                  {hashtag}
                </span>
              ))}
              <span className="hashtag">+</span>
            </div>
          </div>
          <div className="along-courses-list">
            <div className="along-travel-courses-header">여행코스</div>
            {travelCourses.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                index={index}
                setTravelCourses={setTravelCourses}
                writingMode={true}
              />
            ))}
          </div>
          <div className="along-courses-form-add">
            <div onClick={handleSearchPage}>장소추가</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AlongCoursesForm;
