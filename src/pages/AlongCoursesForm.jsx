import React, { useState, useEffect } from 'react';
import '../styles/Page.css';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import UserCard from '../components/UserCard';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import "../styles/AlongCoursesForm.css";

const AlongCoursesForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();  // location으로 전달된 state 받기

    // 기본 초기 상태
    const defaultCourses = [
        {
            name: "이호테우해수욕장",
            address: "제주특별자치도 제주시 이호일동 1665-13",
            category: "관광",
            iconCategory: "tour",
            introduction: "제주 핫플 해변",
            images: [
                {
                    id: 1,
                    url: "/images/course/jeju.jpg"
                }
            ]
        }
    ];

    // location.state에서 travelCourses와 selectedPlace 받아오기
    const [travelCourses, setTravelCourses] = useState(() => {
        return location.state?.travelCourses || defaultCourses;
    });
    const [selectedPlace, setSelectedPlace] = useState(location.state?.selectedPlace || null); // 선택된 장소

    const [hashtags, setHashtags] = useState(() => ["#바다", "#이호테우", "#해변"]);
    const [title, setTitle] = useState(localStorage.getItem('title') || "");
    const [content, setContent] = useState(localStorage.getItem('content') || "");

    const handleSearchPage = () => {
        // title과 content를 저장하고, travelCourses 상태를 함께 전달
        localStorage.setItem('title', title);
        localStorage.setItem('content', content);

        // travelCourses와 함께 검색 페이지로 이동
        navigate('/search/place', { state: { travelCourses } });
    };

    // 컴포넌트가 마운트되었을 때 location.state에서 값을 확인
    useEffect(() => {
        console.log('Location State:', location.state);  // location.state 확인
        console.log('Selected Place:', location.state?.selectedPlace);  // selectedPlace 확인
    }, [location]);

    // selectedPlace가 업데이트되면 travelCourses에 새 코스를 추가
    useEffect(() => {
        if (selectedPlace == null) return;
        const newCourse = {
            name: selectedPlace.title,
            address: selectedPlace.address,
            category: "음식",
            iconCategory: "food",
            introduction: "선택한 장소",
        };
        setTravelCourses((prevCourses) => [...prevCourses, newCourse]);
    }, [selectedPlace]);

    // travelCourses가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        console.log('Updated travelCourses:', travelCourses);
    }, [travelCourses]);

    return (
        <div className='page-container'>
            <PageHeader title={"여행따라"} />
            <div className='along-courses-form-container2'>
                <div className='along-courses-form-save'>저장</div>
                <div className='along-courses-form-container'>
                    <UserCard />
                    <div className='along-courses-form-info'>
                        <div className='along-courses-form-title'>
                            <input 
                                type="text" 
                                id="title" 
                                placeholder="제목" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                        <div className='along-courses-form-content'>
                            <textarea 
                                id="content" 
                                placeholder="내용을 입력하세요" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)} 
                            />
                        </div>
                        <div className="hashtags">
                            {hashtags.map((hashtag, index) => (
                                <span key={index} className="hashtag">{hashtag}</span>
                            ))}
                            <span className='hashtag'>
                                +
                            </span>
                        </div>
                    </div>
                    <div className="along-courses-list">
                        <div className='along-travel-courses-header'>여행코스</div>
                        {travelCourses.map((course, index) => (
                            <CourseCard key={index} course={course} index={index} setTravelCourses={setTravelCourses} writingMode = {true}/>
                        ))}
                    </div>
                    <div className='along-courses-form-add'>
                        <div onClick={handleSearchPage}>장소추가</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AlongCoursesForm;
