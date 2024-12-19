import React, { useState, useEffect } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image_new.png";
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
          navigate("/login-signup")
          settingLoading(false);
        })
        .catch(error => {
          console.error("카카오 로그아웃 중 에러 발생", error);
        });

    } else if (platform === "google") {
      axios.post(`${API_URL}/auth/logout/google`, {}, { withCredentials: true })
        .then(response => {
          logout(); // AuthContext 상태 리셋
          navigate("/login-signup")
          settingLoading(false);
        })
        .catch(error => {
          console.error("구글 로그아웃 중 에러 발생", error);
        });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      settingLoading(true); // 상태 확인 전 로딩 시작
      axios.get(`${API_URL}/auth/status`, { withCredentials: true })
        .then(response => {
          if (response.data.loggedIn) {
            login(
              response.data.jwtToken,
              response.data.nickname,
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


  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={navbarImage} alt="logo" className="logo-icon" />
        <p>가짜 리뷰 검사 서비스</p>
        <h1>잡았다 요놈!</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          {/* <Link to="/home">가짜 리뷰 판독</Link> */}
          가짜 리뷰 판독
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
            onClick={() => navigate("/login-signup")}
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
