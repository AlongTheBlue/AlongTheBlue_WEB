import React from 'react';
import "../styles/AroundRecommend.css";

function AroundRecommend() {
  return (
    <div className="recommend-container">
      <h2>일출봉 유채밭</h2>
      <div className="recommendations">
        <div className="recommendation-item">
          <img src="/path/to/image1.jpg" alt="유채밭 이미지1" />
        </div>
        <div className="recommendation-item">
          <img src="/path/to/image2.jpg" alt="유채밭 이미지2" />
        </div>
        <div className="recommendation-item">
          <img src="/path/to/image3.jpg" alt="유채밭 이미지3" />
        </div>
      </div>
    </div>
  );
}

export default AroundRecommend;
