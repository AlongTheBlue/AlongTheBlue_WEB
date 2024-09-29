import React from 'react';
import "../styles/CourseCard.css";

function CourseCard({course, index}) {
  const url = `/images/icon/marker/${course.iconCategory}_${index+1}.svg`

  return (
    <div className="course-card-container">
      <div className='course-card-header'>
        <div className='course-card-name'>
          <img className='course-card-icon' src={url}></img>
          <div className='course-card-name-text'>{course.name}</div>
        </div>
        <div className='course-card-category'>{course.category}</div>
      </div>
      <div className='course-card-address'>
        <img className='course-card-icon' src='/images/icon/detail_address.svg'></img>
        <div>{course.address}</div>
      </div>
      <div className='course-card-introduction'>{course.introduction}</div>
      <div className='course-card-img-container'>
          <img src={course.images[0].url}/>
      </div>
    </div>
  );
}

export default CourseCard;
