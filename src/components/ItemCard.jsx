import React from 'react';
import "../styles/ItemCard.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ItemCard({ item, selectMode, travelCourses }) {
    const navigate = useNavigate();


    useEffect(() => {
        if(travelCourses)
            console.log("아이템", travelCourses)
    })

    const handleSelectPlace = () => {
        console.log('Selected Place:', item);
        console.log('Travel Courses:', travelCourses);

        // 이전 페이지로 돌아가면서 선택한 장소와 travelCourses를 state로 전달
        navigate('/along/courses/form/1', { state: { selectedPlace: item, travelCourses } });
    }

    return (
        <div className="item-card">
            <div className='item-images-container'>
                <img src={item.image1} alt={item.title} className="item-image" />
                <img src={item.image2} alt={item.title} className="item-image" />
            </div>
            <div className="item-info">
                <div className='item-header'>
                    <div className='item-title'>{item.title}</div>
                    {selectMode ?
                    <div className='item-select' onClick={handleSelectPlace}>선택하기</div>
                     : <img src="/images/icon/unliked.svg"/>}
                </div>
                
                <div className='item-address'>
                    <img src='/images/icon/location.svg'/>
                    <div>{item.address}</div>
                </div>
                <div className="hashtags">
                    {item.hashtags.map((tag, index) => (
                        <span key={index} className="hashtag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;
