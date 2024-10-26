import Header from '../components/Header';
import Search from '../components/Search';
import HomeCategory from '../components/HomeCategory';
import CircleCardList from '../components/CircleCardList';
import SquareCardList from '../components/SquareCardList';
import Footer from '../components/Footer';
import "../styles/Page.css";

function Home() {
  return (
    <div className="page-container">
      <Header />
      <Search searchMode={true}/>
      <HomeCategory />
      <CircleCardList category="tourData" title="관광" />
      <SquareCardList category="accommodation" title="숙소" />
      <SquareCardList category="restaurant" title="음식" />
      <SquareCardList category="cafe" title="카페" />
      <SquareCardList category="course" title="여행코스" />
      <Footer/>
    </div>
  );
}

export default Home;