import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Around from './pages/Around.jsx';
import ItemList from './pages/ItemList.jsx'
import ItemDetail from './pages/ItemDetail.jsx';
import AlongCourses from './pages/AlongCourses.jsx';
import AlongBlues from './pages/AlongBlues.jsx';
import AlongBluesPlan from './pages/AlongBluesPlan.jsx';
import Courses from './pages/Courses.jsx';
import CoursesDetail from './pages/CoursesDetail.jsx';
import AlongCoursesForm from './pages/AlongCoursesForm.jsx';
import SearchPage from './pages/SearchPage.jsx';
import MyPage from './pages/MyPage.jsx';
import axios from 'axios';
import Auth from './components/Auth.jsx';

function App() {

  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);  // Kakao 지도 API 로드 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const requestUser = async (id) => {
    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const userResponse = await axios.get(`${endpoint}/api/user`, {
      headers: { Authorization: `${id}` },
    });
    return userResponse; // userResponse를 반환
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem('id');

      if (id) {
        try {
          const userResponse = await requestUser(id);
          const user = userResponse.data.data; // 데이터를 올바르게 추출
          setUser(user);
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
  
    fetchUser(); // 비동기 함수를 호출
  }, []);

  useEffect(() => {
    // Kakao 지도 API 스크립트를 비동기로 로드
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&libraries=services&autoload=false`;  // autoload=false 옵션 사용
        script.onload = () => {
          window.kakao.maps.load(() => { // Kakao API가 완전히 로드된 후에 실행
            setIsKakaoLoaded(true);
            resolve();
          });
        };
        script.onerror = () => reject(new Error('Kakao Map API script failed to load'));
        document.head.appendChild(script);
      });
    };

    loadKakaoMapScript().catch(err => {
      console.error('Kakao Maps API 로드 실패:', err);
    });
  }, []);

  if (!isKakaoLoaded) {
    return <div>Loading Kakao Maps...</div>;
  }
  
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/list" element={<ItemList />} />         {/* 전체보기 */}
          <Route path="/:title/detail/:id" element={<ItemDetail />} />    {/* 상세보기 */}
          <Route path="/around" element={<Around />}/>                    {/* 내주변 */}
          <Route path="/along/courses" element={<AlongCourses />} />      {/* 여행따라 */}
          <Route path="/along/courses/detail/:id" element={<CoursesDetail alongCoursesMode={true}/>} /> {/* 여행따라 상세 */}
          <Route path="/along/courses/form/:id" element={<AlongCoursesForm/>} />{/*여행따라 작성 */}
          <Route path="/along/blues" element={<AlongBlues />} />          {/* 바당따라 */}
          <Route path="/along/blues/plan/:id" element={<AlongBluesPlan />} />  {/* 바당따라 여행코스 */}
          <Route path="/courses/list" element={<Courses />} />            {/* 여행코스 */}
          <Route path="/courses/detail/:id" element={<CoursesDetail />} />{/* 여행코스 상세 */}
          <Route path="/search" element={<SearchPage/>} />                {/* 검색페이지 */}
          <Route path="/search/place" element={<SearchPage searchPlaceMode={true}/>} />          {/* 장소 검색페이지 */}
          <Route path="/my" element={<MyPage isAuthenticated={isAuthenticated} user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path="/auth" element={<Auth setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;