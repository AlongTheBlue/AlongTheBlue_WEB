import React from 'react';
import "../styles/Search.css"

function Search() {
  return (
    <div className='search'>
        <div className="search-bar">
            <input type="text" placeholder="장소 검색" />
            <img src= "src/images/search.svg" style={{ cursor: "pointer" }}/>
        </div>
    </div>
  );
}

export default Search;