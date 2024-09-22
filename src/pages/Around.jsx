import Footer from '../components/Footer';
import AroundMap from '../components/AroundMap';
import AroundRecommend from '../components/AroundRecommend'
import Search from '../components/Search';
import Header from '../components/Header';
import "../styles/Page.css";

function Around() {
  return (
    <div className="page-container">
        <Header/>
        <Search/>
        <AroundMap/>
        <AroundRecommend/>
        <Footer/>
    </div>
  );
}

export default Around;