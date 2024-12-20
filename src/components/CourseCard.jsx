import { useState } from "react";
import "../styles/CourseCard.css";
import { useNavigate } from "react-router-dom";
import { getCategory, getKrCategory } from "../utils/data";

function CourseCard({ course, index, setTravelCourses, writingMode }) {
  const navigate = useNavigate();
  const url = `/images/icon/marker/${course.category}_${index + 1}.svg`;

  const [imagePreview, setImagePreview] = useState(
    course.images ? course.images[0]?.url : ""
  );
  const [comment, setComment] = useState("");

  const deleteCourse = (idx) => {
    setTravelCourses(
      (prevCourses) => prevCourses.filter((_, i) => i !== idx) // 선택된 코스 제거
    );
  };

  // 이미지 업로드 처리
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result); // 미리보기 이미지 설정
  //       const updatedCourses = [...(course.images || [])];
  //       updatedCourses.push({ url: reader.result });

  //       // course 상태 업데이트
  //       setTravelCourses((prevCourses) =>
  //         prevCourses.map((c, i) =>
  //           i === index ? { ...c, images: updatedCourses } : c
  //         )
  //       );
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // 파일 선택
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 미리보기 이미지 설정
  
      const updatedCourses = [...(course.images || [])];
      updatedCourses.push({ file });
  
      // course 상태 업데이트 (base64가 아니라 파일 자체를 저장)
      setTravelCourses((prevCourses) =>
        prevCourses.map((c, i) =>
          i === index ? { ...c, images: updatedCourses } : c
        )
      );
    }
  };

  // 코멘트 업데이트 처리
  const handleCommentChange = (e) => {
    const updatedComment = e.target.value;
    setComment(updatedComment);

    // course의 comment 업데이트
    setTravelCourses((prevCourses) =>
      prevCourses.map((c, i) =>
        i === index ? { ...c, comment: updatedComment } : c
      )
    );
  };

  return (
    <div className="course-card-container">
      <div className="course-card-header">
        <div className="course-card-name">
          <img className="course-card-icon" src={url} alt="marker icon" />
          <div className="course-card-name-text">{course.title}</div>
        </div>
        <div className="course-card-category">{getKrCategory(course.category)}</div>
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
          {/*<textarea
            placeholder="내용을 입력하세요"
            style={{ height: "3em", padding: "0" }}
          />*/}
      <div className="course-card-introduction along-courses-form-content">
        {writingMode ? (
          <textarea
            id="comment"
            placeholder="내용을 입력하세요"
            value={comment}
            onChange={handleCommentChange}
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
