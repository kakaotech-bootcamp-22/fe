import React, { useState, useEffect } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image.png"; // 실제 파일 경로에 맞게 수정
import profileImage from "../../assets/navbar/profile_image.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, logout, nickname, profileImage } = useAuth(); // AuthContext의 isLoggedIn 상태 사용
  const [showLogout, setShowLogout] = useState(false);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 요청 서버로 보내기
    axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response.data);  // 서버에서 성공 메시지 받기
        logout(); // AuthContext 상태 리셋

        // 카카오 로그아웃
        navigate("/login-signup")
      })
      .catch(error => {
          console.error("로그아웃 중 에러 발생", error);
      });
  };

  useEffect(() => {

  });

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
      {isLoggedIn ? (
        // 로그인 상태일 때
        <div className="profile-container" onClick={handleProfileClick}>
          <img src={profileImage} alt="profile" className="profile-icon" />
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
