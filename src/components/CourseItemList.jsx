import React, { useState } from 'react';
import "../styles/CourseItemList.css";
import CourseItem from './CourseItem';
import { useNavigate } from 'react-router-dom';

function CourseItemList({ courseData }) {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate(`/`);
    };

    return (
        <div className='courses-item-list-page'>
            <div className='item-card-list-header'>
                <img src='../src/images/icon/left_arrow.svg' onClick={handleHomeClick} alt="home"/>
                <div className='item-card-list-title'>여행따라</div>
            </div>
            <div className='courses-item-list-container'>
                {courseData.map((course, index) => (
                    <CourseItem
                        key={index}
                        profileImg={course.profileImg}
                        userName={course.userName}
                        userComment={course.userComment}
                        courseTitle={course.courseTitle}
                        description={course.description}
                        images={course.images}
                        tags={course.tags}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseItemList;
