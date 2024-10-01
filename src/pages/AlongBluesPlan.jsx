import Search from "../components/Search";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Page.css"
import AroundMap from "../components/AroundMap";
import TravelCoursesList from "../components/TravelCoursesList";

const AlongBluesPlan = () => {
    const { id } = useParams();
    const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
    const [searchTrigger, setSearchTrigger] = useState(0);
    const [travelCourses, setTravelCourses] = useState([]);

    const blue = {
      name: "이호테우해수욕장", 
      xMap: "126.4531570913", 
      yMap: "33.4974183784",
      address: "제주특별자치도 제주시 이호일동 1665-13",
      category: "관광",
      iconCategory: "tour"
    };

    const saveTravelCourses =() => {
      let courses = '';
      travelCourses.map((course) => {
          courses += ' '+course.name;
      })
      alert(courses);
  }

    return (
      <div className='page-container'>
        <PageHeader title={"바당따라"}/>
        <Search onSearch={setKeyword} onTrigger={setSearchTrigger}/>
        <AroundMap keyword={keyword} searchTrigger={searchTrigger} selectedBlue={blue} travelCourses={travelCourses} setTravelCourses={setTravelCourses}/>
        <TravelCoursesList travelCourses={travelCourses} setTravelCourses={setTravelCourses}/>
        <div className='travel-courses-save'>
            <button className='travel-courses-save-btn' onClick={saveTravelCourses}>저장하기</button>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default AlongBluesPlan;