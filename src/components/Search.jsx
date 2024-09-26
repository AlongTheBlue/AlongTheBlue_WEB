import React from 'react';
import "../styles/Search.css"
import { useState } from 'react';

function Search({onSearch, onTrigger}) {
  const [keyword, setKeyword] = useState(''); // 입력한 검색어 상태

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {  
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }
    console.log(keyword);
    onSearch(keyword); // 부모 컴포넌트로 검색어 전달
    onTrigger(prev => prev + 1);
  };

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      e.preventDefault(); // 기본 동작 방지
      handleSearch();
    }
  }

  return (
    <div className="search">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="장소 검색" 
          value={keyword} 
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => activeEnter(e)}
        />
        <img 
          src="/images/search.svg" 
          alt="search icon"
          style={{ cursor: "pointer" }}
          onClick={handleSearch} // 검색 버튼 클릭
        />
      </div>
    </div>
  );
}

export default Search;