import React from 'react';
import "../styles/TravelCoursesList.css";
import TravelCourseCard from './TravelCourseCard';

function TravelCoursesList({travelCourses, setTravelCourses}) {

    return (
        <div className="travel-courses-list-container">
            <div className='travel-courses-header'>여행코스</div>
            <div className="travel-courses-list">
                {travelCourses.map((course, index) => (
                <TravelCourseCard key={index} index={index} course={course} setTravelCourses={setTravelCourses}/>
                ))}
            </div>
        </div>
    );
}

export default TravelCoursesList;
