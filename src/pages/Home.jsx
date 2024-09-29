import Header from '../components/Header';
import Search from '../components/Search';
import HomeCategory from '../components/HomeCategory';
import CircleCardList from '../components/CircleCardList';
import SquareCardList from '../components/SquareCardList';
import Footer from '../components/Footer';
import "../styles/Page.css";

const touristSpots = [
  { id: 1, name: '성산일출봉', image: 'http://tong.visitkorea.or.kr/cms/resource/00/2613500_image2_1.jpg' },
  { id: 2, name: '스누피가든', image: 'http://tong.visitkorea.or.kr/cms/resource/87/3354387_image2_1.jpg' },
  { id: 3, name: '올레길', image: 'http://tong.visitkorea.or.kr/cms/resource/21/3056421_image2_1.jpg' }
];

const accommodations = [
  { id: 1, name: '글로스터호텔 제주', address:'제주시 삼무로', image: 'http://tong.visitkorea.or.kr/cms/resource/78/3089178_image2_1.jpg' },
  { id: 2, name: '까델아스 리조트', address:'제주시 애월읍', image: 'http://tong.visitkorea.or.kr/cms/resource/63/2848463_image2_1.jpg' }
];

const foods = [
  // {name: '명진전복', address: '제주시 구좌읍', image: 'src/images/food/명진전복.png'},
  // "https://postfiles.pstatic.net/MjAyMDA3MTNfODQg/MDAxNTk0NjEyMTgwMjIy.bm9T1NDR3d1zBAt7FvXQ5vhSXavmRUkx4QqUs_njZOMg.MLpr55RWqPHPpSJti_xMxOZ3W_-6mcE304wtV5D6kVsg.JPEG.frencblue/1.jpg?type=w773
  { id: 1, name: '명진전복', address: '제주시 구좌읍', image:'https://blog.kakaocdn.net/dn/b3fewH/btqWVSsjaEO/JcMi0zIGZg75AFXSYvDqGk/img.jpg'},
  { id: 2, name: '올래국수', address: '제주시 귀아랑길', image: '/images/food/올래국수.jpeg'}
];
const cafes = [
  { id: 1, name: '커피템플', address: '제주시 영평길', image: 'http://tong.visitkorea.or.kr/cms/resource/87/2783187_image2_1.jpg'},
  { id: 2, name: '가는곶 세화', address: '제주시 세화14길', image: 'http://tong.visitkorea.or.kr/cms/resource/08/2850908_image2_1.jpg'}
];

const tourCourses = [
  {id:1, name: "제주 맛집 리스트", hashtag: "#맛집", image: '/images/course/jeju.jpg'},
  {id:2, name: "제주 바다 여행지", hashtag: "#바다", image: '/images/course/jeju3.jpg'}
];

function Home() {
  return (
    <div className="page-container">
      <Header />
      <Search />
      <HomeCategory />
      <CircleCardList category="tour" title="관광" items={touristSpots}/>
      <SquareCardList category="accommodation" title="숙소" items={accommodations}/>
      <SquareCardList category="restaurant" title="음식" items={foods}/>
      <SquareCardList category="cafe" title="카페" items={cafes}/>
      <SquareCardList category="courses" title="여행코스" items={tourCourses}/>
      <Footer/>
    </div>
  );
}

export default Home;