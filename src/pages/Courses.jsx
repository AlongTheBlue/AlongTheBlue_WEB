import Footer from '../components/Footer';
import Search from '../components/Search';
import { useState } from 'react';
import "../styles/Page.css";
import PageHeader from '../components/PageHeader';
import CoursesList from '../components/CoursesList';

function Courses() {
  const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
  const [searchTrigger, setSearchTrigger] = useState(0);

  const courses = [
    {id:1, title: "제주 맛집 리스트", subTitle:"무조건 가야하는", hashtag: "#맛집", url: '/images/course/jeju.jpg'},
    {id:2, title: "제주 바다 여행지", subTitle:"한적해서 더 좋은", hashtag: "#바다", url: '/images/course/jeju3.jpg'},
    {id:3, title: "제주 포토 명소", subTitle:"실패없는 인생샷", hashtag: "#명소", url: '/images/course/jeju4.jpg'},
  ]

  return (
    <div className="page-container">
        <PageHeader title={"여행코스"}/>
        <Search onSearch={setKeyword} onTrigger={setSearchTrigger}/>
        <CoursesList courses={courses}/>
        <Footer />
    </div>
  );
}

export default Courses;