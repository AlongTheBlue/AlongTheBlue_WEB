import { useState, useEffect } from "react";
import "../styles/Page.css";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import UserCard from "../components/UserCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../styles/AlongCoursesForm.css";
import axios from "axios";
import DetailMap from "../components/DetailMap";

const AlongCoursesForm = () => {
  //변수
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // location으로 전달된 state 받기

  const [travelCourses, setTravelCourses] = useState(() => {
    return location.state?.travelCourses || [];
  });
  const [selectedPlace, setSelectedPlace] = useState(
    location.state?.selectedPlace || null
  );
  const [hashtags, setHashtags] = useState(() => [""]);
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [content, setContent] = useState(localStorage.getItem("content") || "");
  const [courseMarkers, setCourseMarkers] = useState([]);

  // const API_BASE_URL = "https://alongtheblue.site/api";
  const BASE_URL = import.meta.env.VITE_BE_ENDPOINT
  const API_BASE_URL = BASE_URL+"/api"

  const handleSearchPage = () => {
    // title과 content를 저장하고, travelCourses 상태를 함께 전달
    localStorage.setItem("title", title);
    localStorage.setItem("content", content);
    // travelCourses와 함께 검색 페이지로 이동
    console.log(travelCourses)
    navigate("/search/place", { state: { travelCourses } });
  };

  const handleSave = async () => {
    if(travelCourses.length == 0){
      alert("장소가 추가되지 않았습니다.");
      return;
    }

    try {
      const formData = new FormData();

      // TourCourseRequestDto에 해당하는 데이터 추가
      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              title: title,
              content: content,
              hashtags: hashtags,
              tourPostItems: travelCourses.map((course) => ({
                title: course.title,
                category: course.category || "",
                address: course.address,
                comment: course.comment || "",
                xMap: course.xMap,
                yMap: course.yMap,
              })),
            }),
          ],
          { type: "application/json" }
        )
      );

      const response = await axios.post(`${API_BASE_URL}/tourpost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(formData)
        alert("여행 코스가 성공적으로 저장되었습니다.");
        navigate("/along/courses");
      }
    } catch (error) {
      console.error("저장 중 문제가 발생했습니다.", error);
      alert("여행 코스 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    navigate(location.pathname, {
      state: { travelCourses: travelCourses },
      replace: false
    });
  }, [travelCourses])

  useEffect(() => {
    if (travelCourses.length > 0) {
      const updatedMarkers = travelCourses.map(course => ({
        name: course.title,
        lat: course.yMap,
        lng: course.xMap,
        iconCategory: course.category,
      }));
      setCourseMarkers(updatedMarkers);
    }
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
          <DetailMap courseMarkers={courseMarkers}/>
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
