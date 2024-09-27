import Search from "../components/Search";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Page.css"
import AroundMap from "../components/AroundMap";

const AlongBluesPlan = () => {
    const { id } = useParams();
    const [keyword, setKeyword] = useState('');  // 검색어 상태 관리
    const [searchTrigger, setSearchTrigger] = useState(0);

    const blue = { 
      id: 11,
      name: "이호테우해수욕장", 
      xMap: "126.4531570913", 
      yMap: "33.4974183784"
    };

    return (
      <div className='page-container'>
        <PageHeader title={"바당따라"}/>
        <Search onSearch={setKeyword} onTrigger={setSearchTrigger}/>
        <AroundMap keyword={keyword} searchTrigger={searchTrigger} selectedBlue={blue}/>
        <Footer />
      </div>
    );
  };
  
  export default AlongBluesPlan;