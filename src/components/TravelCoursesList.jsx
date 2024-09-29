import React from 'react';
import "../styles/TravelCoursesList.css";
import TravelCourseCard from './TravelCourseCard';

function TravelCoursesList({travelCourses, setTravelCourses}) {
    const saveTravelCourses =() => {
        let courses = '';
        travelCourses.map((course) => {
            courses += ' '+course.name;
        })
        alert(courses);
    }

    return (
        <div className="travel-courses-list-container">
            <div className='travel-courses-header'>여행코스</div>
            <div className="travel-courses-list">
                {travelCourses.map((course, index) => (
                <TravelCourseCard key={index} index={index} course={course} setTravelCourses={setTravelCourses}/>
                ))}
            </div>
            <div className='travel-courses-save'>
                <button className='travel-courses-save-btn' onClick={saveTravelCourses}>저장하기</button>
            </div>
        </div>
    );
}

export default TravelCoursesList;
