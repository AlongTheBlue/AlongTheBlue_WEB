import React, { useState } from 'react';
import '../styles/CourseItem.css'; // 스타일을 위한 CSS 파일

const CourseItem = ({ profileImg, userName, userComment, courseTitle, description, images, tags }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="course-item">
      <div className="profile">
        <img src={profileImg} alt={userName} className="profile-img" />
        <div>
          <div className='profile-name'>{userName}</div>
          <div className='profile-introduction'>{userComment}</div>
        </div>
      </div>

      {/* 이미지 슬라이더 */}
      <div className="image-slider">
        <div className="image-count">
          {currentImageIndex + 1} / {images.length}
        </div>
        <button className="prev-btn" onClick={handlePrevImage}>{"<"}</button>
        <img src={images[currentImageIndex]} alt={courseTitle} className="main-img" />
        <button className="next-btn" onClick={handleNextImage}>{">"}</button>
      </div>

      <div className="course-info">
        <h3>{courseTitle}</h3>
        <p className="description">{description}</p>
        <div className="hashtags">
          {tags.map((tag, index) => (
            <span className="hashtag" key={index}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
