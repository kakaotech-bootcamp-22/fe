// src/components/Home.jsx
import React, { useEffect, useState } from "react";
import "./Home.css";
import mainImage from "../assets/home/home_image.jpeg";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';


const Home = ({ onCheckURL }) => {
  const [url, setUrl] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const { token, login, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // URL에서 'code' 파라미터를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      //console.log("Received Kakao authorization code(인가코드):", code);

      // 받은 인가 코드를 백엔드로 보내어 액세스 토큰 요청
      axios.post('http://localhost:8080/auth/kakao/token', { code: code })
        .then(response => {
          // JWT 토큰을 Context에 저장하여 로그인 처리
          if (response.data.jwtToken) {
            login(response.data.jwtToken, response.data.nickname, response.data.profileImage); // `AuthContext`의 `login` 메서드 호출
          }
        })
        .catch(error => {
          //console.error("백엔드와 통신 중 에러 발생:", error);
          setErrorMessage("로그인에 실패했습니다.");
        });
    } else {
      //console.log("인가 코드가 없습니다.");
    }
  }, []); // 한 번만 실행되도록 빈 배열을 의존성 배열에 추가
  
  const handleInputChange = (e) => {
    setUrl(e.target.value);
  }

  const handleCheckButtonClick = () => {
    if (!url) {
      alert('URL을 입력해주세요.');
      return;
    }

    // 네이버 블로그 형식이 맞는지 검사 (https://blog.naver.com/{블로그아이디}/{작성글ID})
    const naverBlogUrlPattern = /^https:\/\/blog\.naver\.com\/[a-zA-Z0-9_-]+\/[0-9]+$/;
    if (!naverBlogUrlPattern.test(url)) {
      alert('올바른 네이버 블로그 URL을 입력해주세요! 다른 블로그는 추후 서비스 예정입니다.');
      return;
    }

    // URL 형식이 맞다면 검사 요청 수행
    onCheckURL(url);
  };

  const clearInput = () => {
    setUrl('');
  };

  return (
    <div className="home-container">
      {/* Rectangle 1 - 검색 영역 */}
      <div className="search-section-wrapper">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="검사를 원하는 포스트의 URL을 붙여넣으세요!"
            className="url-input"
            value={url}
            onChange={handleInputChange}
          />
          {url && (
            <button className="clear-button" onClick={clearInput}>x</button>
          )}
        </div>
        <button className="search-button" onClick={handleCheckButtonClick}>검사하기</button>
      </div>

      {/* Rectangle 2 - 이미지 및 설명 카드 영역 */}
      <div className="content-section">
        <div className="card main-image-card">
          <img src={mainImage} alt="무한도전 짤" className="main-image" />
        </div>
        <div className="card description-card">
          <h2>
            내가 본 블로그 리뷰가 돈을 받고 작성된 리뷰일 수 있다고? 🙉
            신뢰할 수 있는 리뷰인지 함께 확인해보아요! 💬
          </h2>
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
