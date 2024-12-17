import React, { useEffect, useState } from "react";
import "./Home.css";
import mainImage from "../assets/home/home_image.jpeg";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd"; // Ant Design message 추가

const Home = ({ onCheckURL }) => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login, logout, nickname, profileImage, platform, createdAt, email, writtenReviewCount,
    receivedLikeCount, loading, settingLoading, loginFail, } = useAuth(); // 로그인 상태 및 사용자 정보 가져오기
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  // location.state에서 에러 메시지 확인
  useEffect(() => {
    if (location.state?.error) {
      message.error(location.state.error);
      // 에러 메시지를 표시한 후 state 초기화
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // 받은 인가 코드를 백엔드로 전송하여 액세스 토큰 요청
      axios
        .post(`${API_URL}/auth/kakao/token`, { code })
        .then((response) => {
          if (response.data.jwtToken) {
            login(
              response.data.jwtToken,
              response.data.nickname,
              response.data.profileImage,
              response.data.platform,
              response.data.createdAt,
              response.data.email
            );
          }
          settingLoading(false);

          // URL에서 "code" 파라미터 제거
          const url = new URL(window.location.href);
          url.searchParams.delete("code"); // "code" 파라미터 제거
          window.history.replaceState(null, "", url.toString());

        })
        .catch(error => {
          //console.error("백엔드와 통신 중 에러 발생:", error);
          setErrorMessage("로그인에 실패했습니다.");

        });
    }
    else {
      if (isLoggedIn === false) {
        axios.get(`${API_URL}/auth/status`, { withCredentials: true })
          .then(response => {
            if (response.data.loggedIn) {
              // 쿠키에서 JWT 토큰을 가져와 로그인 상태 처리
              login(response.data.jwtToken, response.data.nickname, response.data.userImage, response.data.platform, response.data.createdAt, response.data.email);
            }
          })
          .catch((error) => {
            setErrorMessage("로그인 상태를 확인할 수 없습니다.");
            loginFail(false);
            settingLoading(false);
          })
          .finally(() => {
            settingLoading(false);
          })
      }
    }
  }, [isLoggedIn, API_URL, login]);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckButtonClick = async () => {
    if (!url) {
      message.error("URL을 입력해주세요.");
      return;
    }

    // 네이버 블로그 URL 형식 검사
    const naverBlogUrlPattern = /^https:\/\/blog\.naver\.com\/[a-zA-Z0-9_-]+\/[0-9]+$/;
    if (!naverBlogUrlPattern.test(url)) {
      message.error("올바른 네이버 블로그 URL을 입력해주세요! 다른 블로그는 추후 서비스 예정입니다.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/review-check`, { blogUrl: url });

      if (response.status === 202 && response.data.requestId) {
        const { requestId } = response.data;
        console.log("Navigating to /loading with requestId:", requestId);
        navigate("/loading", { state: { requestId } });
      } else {
        message.error("AI 분석 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("AI 분석 요청 중 오류 발생:", error);
      message.error(error.response?.data?.message || "AI 분석 요청 중 문제가 발생했습니다.");
    }
  };

  const clearInput = () => {
    setUrl("");
  };

  return (
    <div className="home-container">
      {/* 검색 영역 */}
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
            <button className="clear-button" onClick={clearInput}>
              x
            </button>
          )}
        </div>
        <button className="search-button" onClick={handleCheckButtonClick}>
          검사하기
        </button>
      </div>

      {/* 이미지 및 설명 카드 영역 */}
      <div className="content-section">
        <div className="card main-image-card">
          <img src={mainImage} alt="무한도전 짤" className="main-image" />
        </div>
        <div className="card description-card">
          <h2>
            내가 본 블로그 리뷰가 돈을 받고 작성된 리뷰일 수 있다고? 🙉 신뢰할 수 있는 리뷰인지 함께 확인해보아요! 💬
          </h2>
          <p>
            우리 서비스는 AI 기술로 가짜 리뷰를 똑똑하게 찾아드립니다. BERT 언어 모델을 활용해 텍스트를 분석하고, 신뢰하기 어려운 리뷰를 걸러내 진짜 리뷰만 남겨드려요. 사용자 분들이 믿을 수 있는 리뷰를 통해 현명한 선택을 하실 수 있도록
            도와드리겠습니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
