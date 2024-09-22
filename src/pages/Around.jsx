import Footer from '../components/Footer';
import AroundMap from '../components/AroundMap';
import AroundRecommend from '../components/AroundRecommend'
import Search from '../components/Search';
import Header from '../components/Header';
import { useState } from 'react';
import "../styles/Page.css";

function Around() {
  const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <div className="page-container">
        <Header/>
        <Search onSearch={setKeyword} onTrigger={setSearchTrigger}/>  {/* 검색어를 입력받음 */}
        <AroundMap keyword={keyword} searchTrigger={searchTrigger}/> {/* 검색어에 따라 지도 업데이트 */}
        {/* <AroundRecommend /> */}
        <Footer />
    </div>
  );
}

export default Around;