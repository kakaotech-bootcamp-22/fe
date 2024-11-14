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
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const sendHello = () => {
  //   axios.post('http://localhost:8080/api/sayHello', {
  //     message: '안녕하세요!'
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => {
  //       console.log('백엔드 응답!!!!:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('백엔드로 메시지 전송 중 에러 발생!!!!:', error);
  //     });
  // };


  useEffect(() => {
    // URL에서 'code' 파라미터를 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("Received Kakao authorization code(인가코드):", code);

      // 받은 인가 코드를 백엔드로 보내어 액세스 토큰 요청
      axios.post('http://localhost:8080/auth/kakao/token', { code: code })
        .then(response => {
          console.log("백엔드 응답:", response.data);
          setAccessToken(response.data.accessToken); // 받은 액세스 토큰을 상태에 저장
        })
        .catch(error => {
          console.error("백엔드와 통신 중 에러 발생:", error);
          setErrorMessage("로그인에 실패했습니다.");
        });
    } else {
      console.log("인가 코드가 없습니다.");
    }
  }, []); // 한 번만 실행되도록 빈 배열을 의존성 배열에 추가
  

  //   const { Kakao } = window;
  //   if (Kakao) {
  //     if (!Kakao.isInitialized()) {
  //       Kakao.init("826a723547312cf55037f1bf217f293b");
  //       console.log("Kakao SDK initialized:", Kakao.isInitialized());
  //     }

  //     // 리다이렉트된 경우 토큰 처리
  //     const token = Kakao.Auth.getAccessToken();
  //     if (token) {
  //       setAccessToken(token);
  //       login(token);
  //       console.log("카카오 로그인 성공 - 토큰:", token);

  //       //백엔드로 토큰 전송
  //       axios.post('http://localhost:8080/auth/kakao/token', { token }, {
  //         withCredentials: true
  //       })
  //         .then(response => {
  //           console.log("백엔드 응답:", response.data);
  //         })
  //         .catch(error => {
  //           console.error('백엔드와 통신 중 에러 발생:', error);
  //         });

  //       // 백엔드로 토큰 전송 (axios 인스턴스 사용)
  //       //     axiosInstance.post('/auth/kakao/token', { token })
  //       //     .then(response => {
  //       //         // 성공적으로 처리된 경우
  //       //         console.log("백엔드 응답:", response.data);
  //       //     })
  //       //     .catch(error => {
  //       //         // 에러 처리
  //       //         console.error('백엔드와 통신 중 에러 발생:', error);
  //       //     });
  //       //   }
  //       // } else {
  //       //   setErrorMessage("Kakao SDK 로드에 실패했습니다.");
  //       // }
  //       // }, [login]);
  //     }
  //   }
  // });
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


  // {/* 추후 jwt 테스트용 코드 */ }

  // const checkUserStatus = () => {
  //   const { Kakao } = window;
  //   const token = Kakao.Auth.getAccessToken();
  //   if (token) {
  //     console.log("현재 액세스 토큰이 있습니다:", token);
  //     setAccessToken(token);
  //   } else {
  //     console.log("액세스 토큰이 없습니다.");
  //     // refreshToken();
  //   }
  // };

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
      {/* 추후 jwt 테스트용 코드 */}
      {/* <button onClick={checkUserStatus}>나를 눌러봐</button> */}
      {/* <button onClick={sendHello}>안녕? 보내기</button> */}

    </div>
  );
};

export default Home;
