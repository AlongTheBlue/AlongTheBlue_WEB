import { useState } from 'react';
import '../styles/CourseItem.css'; // 스타일을 위한 CSS 파일
import { useNavigate } from 'react-router-dom';

const CourseItem = ({ course, alongCourse }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleAlongCourseDetail = () => {
    if(alongCourse)
      navigate(`/along/courses/detail/${course.id}`)
    else
      navigate(`/along/blues/detail/${course.id}`)
  }

  // const handleNextImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const handlePrevImage = () => {
  //   setCurrentImageIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };
  // <img src={images[currentImageIndex]} alt={courseTitle} className="main-img" />

  return (
    <div className="course-item">
      {/* 이미지 슬라이더 */}
      <div onClick={handleAlongCourseDetail} style={{cursor:"pointer"}}>
        {course.imgUrl &&
        <div className="image-slider">
          {/* <div className="image-count"> */}
            {/* {currentImageIndex + 1} / {images.length} */}
          {/* </div> */}
          {/* <button className="prev-btn" >{"<"}</button> */}
          <img src={course.imgUrl} alt={course.title} className="main-img" />
          {/* <button className="next-btn" >{">"}</button> */}
        </div>
        }
        <div className="course-info">
          <h3>{course.title}</h3>
          <p className="description">{course.content}</p>
          <div className="hashtags">
            {course.hashtags && course.hashtags.map((tag, index) => (
              <span className="hashtag" key={index}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
