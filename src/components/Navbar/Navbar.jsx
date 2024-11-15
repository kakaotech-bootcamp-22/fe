import React, { useState, useEffect } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image.png"; // 실제 파일 경로에 맞게 수정
import profileImage from "../../assets/navbar/profile_image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { token, login, logout } = useAuth();
  // console.log("Navbar token:", token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false); // 리디렉션 여부 상태 추가


  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const navigate = useNavigate();

   // 로그인 후 페이지 이동을 한 번만 할 수 있도록 처리
   useEffect(() => {
    if (token) {
      navigate("/home"); // 로그인 후 리디렉션
    }
  }, [token, navigate]); // `token`이 변경될 때만 리디렉션 시도



  return (
    <nav className="navbar">
      <div className="navbar-logo">
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
        <li onClick={() => navigate("/mypage")}>내 정보</li>
      </ul>
      {token ? (
        // 로그인 상태일 때
        <div className="profile-container" onClick={handleProfileClick}>
          <img src={profileImage} alt="profile" className="profile-icon" />
          <span className="dropdown-icon"></span>

          {showLogout && (
            <button
              className="logout-button"
              onClick={() => setIsLoggedIn(false)}
            >
              로그아웃
            </button>
          )}
        </div>
      ) : (
        // 로그인되지 않았을 때
        <button
          onClick={() => navigate("/login-signup")}
          className="login-button"
        >
          로그인/가입
        </button>
      )}
    </nav>
  );
};

export default Navbar;
