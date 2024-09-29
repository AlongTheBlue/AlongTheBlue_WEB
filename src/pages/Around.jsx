import Footer from '../components/Footer';
import AroundMap from '../components/AroundMap';
import Search from '../components/Search';
import { useState } from 'react';
import "../styles/Page.css";
import PageHeader from '../components/PageHeader';

function Around() {
  const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
  const [searchTrigger, setSearchTrigger] = useState(0);

  return (
    <div className="page-container">
        <PageHeader title={"내주변"}/>
        <Search onSearch={setKeyword} onTrigger={setSearchTrigger}/>
        <AroundMap keyword={keyword} searchTrigger={searchTrigger}/>
        <Footer />
    </div>
  );
}

export default Around;