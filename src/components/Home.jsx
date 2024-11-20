import React, { useEffect, useState } from "react";
import "./Home.css";
import mainImage from "../assets/home/home_image.jpeg";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 전환을 위한 hook 추가

const Home = ({ onCheckURL }) => {
  const [url, setUrl] = useState("");
  const { isLoggedIn, login, logout, nickname, profileImage, platform } = useAuth(); // 로그인 상태 및 사용자 정보 가져오기
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // React Router를 사용하여 페이지 전환

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      axios
        .post("http://localhost:8080/auth/kakao/token", { code: code })
        .then((response) => {
          if (response.data.jwtToken) {
            login(response.data.jwtToken, response.data.nickname, response.data.profileImage, response.data.platform);
          }
        })
        .catch(() => {
          setErrorMessage("로그인에 실패했습니다.");
        });
    } else {
      axios
        .get("http://localhost:8080/auth/status", { withCredentials: true })
        .then((response) => {
          if (response.data.isLoggedIn) {
            login(response.data.jwtToken, response.data.nickname, response.data.userImage, response.data.platform);
          }
        })
        .catch(() => {
          setErrorMessage("로그인 상태를 확인할 수 없습니다.");
        });
    }

    // 토큰 확인
    // const token = Kakao.Auth.getAccessToken();
    // if (token) {
    //   setAccessToken(token);
    //   console.log("현재 액세스 토큰:", token);
    // } else {
    //   console.log("로그인되지 않았거나 토큰이 없습니다.");
    // }

  }, []);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckButtonClick = async () => {
    if (!url) {
      alert("URL을 입력해주세요.");
      return;
    }

    // 네이버 블로그 형식이 맞는지 검사 (https://blog.naver.com/{블로그아이디}/{작성글ID})
    const naverBlogUrlPattern = /^https:\/\/blog\.naver\.com\/[a-zA-Z0-9_-]+\/[0-9]+$/;
    if (!naverBlogUrlPattern.test(url)) {
      alert("올바른 네이버 블로그 URL을 입력해주세요! 다른 블로그는 추후 서비스 예정입니다.");
      return;
    }

    try {
      // 백엔드에 URL을 전송하여 requestId를 가져옴
      const response = await axios.post("http://localhost:8080/start-analysis", { blogUrl: url });
      if (response.status === 200 && response.data.requestId) {
        const requestId = response.data.requestId; // requestId 추출
        navigate("/loading", { state: { requestId } }); // 로딩 페이지로 이동하며 requestId 전달
      } else {
        alert("AI 분석 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("AI 분석 요청 중 오류 발생:", error);
      alert("AI 분석 요청 중 문제가 발생했습니다.");
    }
  };

  const clearInput = () => {
    setUrl("");
  };


  {/* 추후 jwt 테스트용 코드 */}

  // const checkUserStatus = () => {
  //   const { Kakao } = window;
  //   const token = Kakao.Auth.getAccessToken();
  //   if (token) {
  //     console.log("현재 액세스 토큰이 있습니다:", token);
  //     setAccessToken(token);
  //   } else {
  //     console.log("액세스 토큰이 없습니다.");
  //     refreshToken();
  //   }
  // };

  const refreshToken = () => {
    const { Kakao } = window;
    if (Kakao && Kakao.isInitialized() && Kakao.Auth?.login) {
      Kakao.Auth.login({
        success: (authObj) => {
          console.log("새로운 액세스 토큰이 발급되었습니다:", authObj.access_token);
        },
        fail: (err) => {
          console.error("로그인 갱신 실패:", err);
        },
      });
    } else {
      console.error("Kakao SDK가 초기화되지 않았거나 로그인 메서드가 없습니다.");
    }
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
            <button className="clear-button" onClick={clearInput}>
              x
            </button>
          )}
        </div>
        <button className="search-button" onClick={handleCheckButtonClick}>
          검사하기
        </button>
      </div>

      {/* Rectangle 2 - 이미지 및 설명 카드 영역 */}
      <div className="content-section">
        <div className="card main-image-card">
          <img src={mainImage} alt="무한도전 짤" className="main-image" />
        </div>
        <div className="card description-card">
          <h2>
            내가 본 블로그 리뷰가 돈을 받고 작성된 리뷰일 수 있다고? 🙉 신뢰할 수 있는 리뷰인지 함께 확인해보아요! 💬
          </h2>
          <p>
            우리 서비스는 AI 기술로 가짜 리뷰를 똑똑하게 찾아드립니다. BERT 언어 모델을 활용해 텍스트를 분석하고, 신뢰하기 어려운 리뷰를 걸러내 진짜 리뷰만 남겨드려요. 사용자 분들이 믿을 수 있는 리뷰를 통해 현명한 선택을 하실 수 있도록 도와드리겠습니다!
          </p>
        </div>
      </div>
      {/* 추후 jwt 테스트용 코드 */}
      {/* <button onClick={checkUserStatus}>나를 눌러봐</button> */}

    </div>
  );
};

export default Home;
