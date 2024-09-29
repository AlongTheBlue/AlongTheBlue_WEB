import React from 'react';
import CoursesCard from './CoursesCard';

const CoursesCardList = ({courses}) => {
    return (
        <div className='courses-card-list-container'>
            <div className="courses-card-list">
                {courses.map((course, index) => (
                    <CoursesCard key={index} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CoursesCardList;
