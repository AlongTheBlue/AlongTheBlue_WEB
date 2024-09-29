import React from 'react';
import "../styles/CoursesCard.css"

const CoursesCard = ({course}) => {
    return (
        <div className='courses-card-container'>
            <div className='courses-card-img' style={{
                backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0), 
                    rgba(0, 0, 0, 0.8)
                  ),url(${course.url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '90%',
                  height: '20em',
                  borderRadius: '5px'
            }}>
                <div className='courses-card-info'>
                    <div className='courses-card-header'>
                        {course.subTitle}
                    </div>
                    <div className='courses-card-main'>
                        <div className='courses-card-title'>{course.title}</div>
                        <div className='courses-card-hashtag'>{course.hashtag}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesCard;
