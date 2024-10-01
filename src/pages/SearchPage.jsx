import Footer from '../components/Footer';
import Search from '../components/Search';
import { useState } from 'react';
import "../styles/Page.css";
import PageHeader from '../components/PageHeader';
import "../styles/SearchPage.css";
import ItemCardList from '../components/ItemCardList';
import { useLocation } from 'react-router-dom'; // useLocation import
import { useEffect } from 'react';

function SearchPage({searchPlaceMode}) {
    const location = useLocation();  // location으로 전달받은 state 가져오기

    // travelCourses를 location.state에서 받아오기
    const [travelCourses, setTravelCourses] = useState(() => {
        return location.state?.travelCourses || [];
    });

    useEffect(() => {
        console.log("하이 ", travelCourses)
    }, [location])

    const popularPlaces = [
        "한라산", "성산일출봉", "섭지코지", "만장굴", "우도", "추자도", 
        "국립제주박물관", "성읍민속마을", "휴애리 자연생활공원", "제주 올레"
    ];

    const popularBlues = [
        { name: "함덕 서우봉 해변", url: "/images/course/jeju.jpg" },
        { name: "협재 해수욕장", url: "/images/course/jeju2.jpg" },
        { name: "용머리 해안", url: "/images/course/jeju3.jpg" }
    ];

    const searchResult = [
        {
            title: '명진전복', 
            address: '제주특별자치도 제주시 구좌읍 해맞이해안로 1282', 
            hashtags: [
                "#전복요리",
                "#전복돌솥밥",
                "#바다뷰맛집",
                "#고등어구이",
                "#제주맛집"
            ], 
            image1: '/images/food/명진전복.png',
            image2: 'https://blog.kakaocdn.net/dn/b3fewH/btqWVSsjaEO/JcMi0zIGZg75AFXSYvDqGk/img.jpg'
        },
        { 
            title: '올래국수', 
            address: '제주특별자치도 제주시 귀아랑길 24', 
            hashtags: [
                "#제주고기국수",
                "#올래국수",
                "#진한사골국물",
                "#제주고기국수맛집",
                "#수요미식회맛집"
            ], 
            image1: '/images/food/올래국수.jpeg',
            image2: 'https://api.cdn.visitjeju.net/photomng/imgpath/201910/23/cfb35a88-5beb-4434-96b6-c878a6073d49.jpg'},
    ];

    return (
         <div className="page-container">
            <PageHeader title={"검색"}/>
            <Search/>
        
            {!searchPlaceMode ?
            <div>
                <div className="recommend-place-container">
                    <div className='recommend-place'>추천 장소</div>
                    <ul>
                        {popularPlaces.map((place, index) => (
                            <li key={index}>
                                <span className='recommend-place-index'>{index + 1}</span> 
                                <span className='recommend-place-name'>{place}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='popular-blues-container'>
                    <div className='popular-blues-text'>추천 해변</div>
                    <div className="popular-blues-list">
                        {popularBlues.map((popularBlue, index) => (
                        <div key={index} className="popular-blues">
                            <img src={popularBlue.url} alt={popularBlue.name} className="popular-blues-image" />
                            <div className='popular-blues-name'>{popularBlue.name}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div> 
            :
            <div className='search-result-container'>
                <div className='hashtags'>
                    <span className='hashtag'>전체</span>
                    <span className='hashtag'>관광</span>
                    <span className='hashtag'>숙박</span>
                    <span className='hashtag'>음식</span>
                    <span className='hashtag'>카페</span>
                </div>
                <div>{searchResult.length}개의 검색결과</div>
                <ItemCardList items={searchResult} selectMode={true} travelCourses={travelCourses} />
            </div>
        }
        <Footer />
    </div>
  );
}

export default SearchPage;
