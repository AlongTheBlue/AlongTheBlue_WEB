import React from "react";
import "../styles/TravelCourseCard.css";
import { useNavigate } from "react-router-dom";

function TravelCourseCard({ index, course, setTravelCourses }) {
  const navigate = useNavigate();
  const titleUrl = `/images/icon/marker/${course.iconCategory}_${
    index + 1
  }.svg`;

  const deleteCourse = (idx) => {
    setTravelCourses(
      (prevCourses) => prevCourses.filter((_, i) => i !== idx) // 선택된 코스 제거
    );
  };

  return (
    <div className="travel-course-container">
      <div className="travel-course-header">
        <div className="travel-course-title">
          <img className="travel-course-title-img" src={titleUrl} />
          <div>{course.name}</div>
        </div>
        <div>
          <div className="travel-course-category">{course.category}</div>
        </div>
      </div>
      <div className="travel-course-info">
        <div className="travel-course-text">
          <img
            className="travel-course-address-img"
            src="/images/icon/detail_address.svg"
          />
          <div>{course.address}</div>
        </div>
        <div className="travel-course-delete">
          <button
            className="travel-course-delete-btn"
            onClick={() => deleteCourse(index)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravelCourseCard;
