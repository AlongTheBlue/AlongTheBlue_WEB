import React, { useState } from "react";
import "../styles/CourseCard.css";
import { useNavigate } from "react-router-dom";

function CourseCard({ course, index, setTravelCourses, writingMode }) {
  const navigate = useNavigate();
  const url = `/images/icon/marker/${course.iconCategory}_${index + 1}.svg`;

  const [imagePreview, setImagePreview] = useState(
    course.images ? course.images[0]?.url : ""
  );

  const deleteCourse = (idx) => {
    if (idx === 0) {
      alert("해변을 다시 선택해주세요");
      navigate(-1);
    }
    setTravelCourses(
      (prevCourses) => prevCourses.filter((_, i) => i !== idx) // 선택된 코스 제거
    );
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // 미리보기 이미지 설정
        const updatedCourses = [...(course.images || [])];
        updatedCourses.push({ url: reader.result });

        // course 상태 업데이트
        setTravelCourses((prevCourses) =>
          prevCourses.map((c, i) =>
            i === index ? { ...c, images: updatedCourses } : c
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="course-card-container">
      <div className="course-card-header">
        <div className="course-card-name">
          <img className="course-card-icon" src={url} alt="marker icon" />
          <div className="course-card-name-text">{course.name}</div>
        </div>
        <div className="course-card-category">{course.category}</div>
      </div>

      <div className="travel-course-info">
        <div className="travel-course-text">
          <img
            className="travel-course-address-img"
            src="/images/icon/detail_address.svg"
            alt="address icon"
          />
          <div>{course.address}</div>
        </div>
        {writingMode && (
          <div className="travel-course-delete">
            <button
              className="travel-course-delete-btn"
              onClick={() => deleteCourse(index)}
            >
              X
            </button>
          </div>
        )}
      </div>

      <div className="course-card-introduction along-courses-form-content">
        {writingMode ? (
          <textarea
            placeholder="내용을 입력하세요"
            style={{ height: "3em", padding: "0" }}
          />
        ) : (
          <span>{course.introduction}</span>
        )}
      </div>

      <div className="course-card-img-container">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="course image"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        )}

        {/* 파일 업로드 */}
        {writingMode && (
          <div className="file-upload">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
