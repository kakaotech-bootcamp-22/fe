import React, { useState, useEffect } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image.png"; // 실제 파일 경로에 맞게 수정
import profileImage from "../../assets/navbar/profile_image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, logout, nickname, profileImage, platform, createdAt, email, writtenReviewCount,
    receivedLikeCount, loading, login, settingLoading, } = useAuth(); // AuthContext의 isLoggedIn 상태 사용
  const [showLogout, setShowLogout] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    if (platform === "kakao") {
      axios.post(`${API_URL}/auth/logout/kakao`, {}, { withCredentials: true })
        .then(response => {
          logout(); // AuthContext 상태 리셋
          if (window.location.pathname === "/edit-mypage" || window.location.pathname === "/mypage") {
            navigate("/");
          } else {
            navigate(0);
          }
          settingLoading(false);
        })
        .catch(error => {
          console.error("카카오 로그아웃 중 에러 발생", error);
        });

    } else if (platform === "google") {
      axios.post(`${API_URL}/auth/logout/google`, {}, { withCredentials: true })
        .then(response => {
          logout(); // AuthContext 상태 리셋
          if (window.location.pathname === "/edit-mypage" || window.location.pathname === "/mypage") {
            navigate("/");
          } else {
            navigate(0);
          }
          settingLoading(false);
        })
        .catch(error => {
          console.error("구글 로그아웃 중 에러 발생", error);
        });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      if (!document.cookie.includes("jwtToken")) {
        settingLoading(false);
        return;
      }
      settingLoading(true); // 상태 확인 전 로딩 시작
      axios.get(`${API_URL}/auth/status`, { withCredentials: true })
        .then(response => {
          if (response.data.loggedIn) {
            let str = response.data.nickname;
            // 문자열에 \uad가 포함되어 있는지 검사
            if (str.includes("\u00ad")) {
              str = str.slice(1); // 인덱스 1부터 자르기
            }
            login(
              response.data.jwtToken,
              str,
              response.data.userImage,
              response.data.platform,
              response.data.createdAt,
              response.data.email
            );
          }

        })
        .catch(() => {
          console.log("로그인 상태를 확인할 수 없습니다.");
        })
        .finally(() => {
          settingLoading(false); // 로딩 완료
        });
    }
  }, []);

  const handleLoginRedirect = () => {
    // 현재 페이지 경로를 상태 또는 로컬 스토리지에 저장
    const currentPath = window.location.pathname;
    const currentUrl = window.location;
    localStorage.setItem("redirectAfterLoginPath", currentPath);
    localStorage.setItem("redirectAfterLoginURL", currentUrl);

    // 로그인 페이지로 이동
    navigate("/login-signup");
  };


  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={navbarImage} alt="logo" className="logo-icon" />
        <h1>가짜 리뷰 판독기</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          {/* <Link to="/home">가짜 리뷰 판독</Link> */}
          가짜 리뷰 판독
        </li>
        <li>
          {/* <Link to="/tech">사용 기술</Link> */}
          사용 기술
        </li>
        <li>
          {/* <Link to="/criteria">검사 기준</Link> */}
          검사 기준
        </li>
        {loading ? (
          isLoggedIn ? (
            // 로딩 중이고 로그인 상태일 때
            <li style={{ width: "70px", display: "inline-block" }}>&nbsp;</li>
          ) : (
            // 로딩 중이고 비로그인 상태일 때
            <div style={{ width: "70px", display: "inline-block" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          )
        ) : isLoggedIn ? (
          // 로딩 완료되고 로그인 상태일 때
          <li onClick={() => navigate("/mypage")}>내 정보</li>
        ) : (
          // 로딩 완료되고 비로그인 상태일 때
          <></>
        )}
      </ul>
      {isLoggedIn ? (
        loading ? (
          // 로딩 중이고 로그인 상태일 때
          <div className="profile-container" onClick={handleProfileClick}>
            <img
              src={profileImage}
              alt="profile"
              className="profile-icon"
            />
            <span className="dropdown-icon"></span>

            {showLogout && (
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            )}
          </div>
        ) : (
          // 로딩 완료되고 로그인 상태일 때
          <div className="profile-container" onClick={handleProfileClick}>
            <img
              src={profileImage}
              alt="profile"
              className="profile-icon"
            />
            <span className="dropdown-icon"></span>

            {showLogout && (
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            )}
          </div>
        )
      ) : (
        loading ? (
          // 로딩 중이고 비로그인 상태일 때
          <div style={{ width: "70px", display: "inline-block" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : (
          // 로딩 완료되고 비로그인 상태일 때
          <button

            //onClick={() => navigate("handleLoginRedirect")}
            onClick={handleLoginRedirect}
            className="login-button"
          >
            로그인/가입
          </button>
        )
      )}
    </nav>
  );
};

export default Navbar;
