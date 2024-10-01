import React from 'react';
import "../styles/CourseCard.css";
import { useNavigate } from 'react-router-dom';

function CourseCard({course, index, setTravelCourses, writingMode}) {
  const navigate = useNavigate();
  const url = `/images/icon/marker/${course.iconCategory}_${index+1}.svg`

  const deleteCourse = (idx) => {
    if(idx == 0){
        alert("해변을 다시 선택해주세요");
        navigate(-1);
    }
    setTravelCourses(prevCourses => 
        prevCourses.filter((_, i) => i !== idx) // 선택된 코스 제거
    );
  }

  return (
    <div className="course-card-container">
      <div className='course-card-header'>
        <div className='course-card-name'>
          <img className='course-card-icon' src={url}></img>
          <div className='course-card-name-text'>{course.name}</div>
        </div>
        <div className='course-card-category'>{course.category}</div>
      </div>

      <div className='travel-course-info'>
        <div className='travel-course-text'>
          <img className="travel-course-address-img" src='/images/icon/detail_address.svg'/>
          <div>{course.address}</div>
        </div>
        {writingMode && 
          <div className='travel-course-delete'>
            <button className='travel-course-delete-btn' onClick={() => deleteCourse(index)}>X</button>
          </div>
        }
      </div>
      {/* 
          <div className='course-card-address'>
            <img className='course-card-icon' src='/images/icon/detail_address.svg'></img>
            <div>{course.address}</div>
          </div> 
      */}
      <div className='course-card-introduction along-courses-form-content' >
      {writingMode ? <textarea placeholder='내용을 입력하세요' style={{height: '3em', padding: '0'}}/> : <span>{course.introduction}</span>}
      </div>
      <div className='course-card-img-container'>
      {course.images && course.images.length > 0 
          && <img src={course.images[0].url} alt="course image" />
      }
      <div>파일추가</div>
      </div>
      
    </div>
  );
}

export default CourseCard;
