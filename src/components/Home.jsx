// src/components/Home.jsx
import React from "react";
import "./Home.css";
import mainImage from "../assets/navbar/navbar_image.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="search-section">
        <input
          type="text"
          placeholder="검사를 원하는 포스트의 URL을 붙여넣으세요!"
          className="url-input"
        />
        <button className="search-button">검사하기</button>
      </div>

      <div className="content-section">
        <img src={mainImage} alt="무한도전 짤" className="main-image" />
        <div className="description">
          <h2>
          내가 본 블로그 리뷰가 돈을 받고 작성된 리뷰일 수 있다고? 🙉
          신뢰할 수 있는 리뷰인지 함께 확인해보아요! 💬</h2>
          <p>우리 서비스는 AI 기술로 가짜 리뷰를 똑똑하게 찾아드립니다. 
              BERT 언어 모델을 활용해 텍스트를 분석하고, 신뢰하기 어려운 리뷰를 걸러내 진짜 리뷰만 남겨드려요. 
              사용자 분들이 믿을 수 있는 리뷰를 통해 현명한 선택을 하실 수 있도록 도와드리겠습니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
