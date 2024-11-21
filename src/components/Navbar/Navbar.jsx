import React, { useState, useEffect } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image.png"; // 실제 파일 경로에 맞게 수정
import profileImage from "../../assets/navbar/profile_image.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";


const Navbar = () => {
  const { token, login, logout } = useAuth();
  // console.log("Navbar token:", token);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen((prevState) => !prevState); // 드롭다운 열고 닫기
  };

  const navigate = useNavigate();

  useEffect(() => {
    //console.log("현재 token 상태:", token);
  }, [token]);
  


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
        <div className="profile-container">
          <img src={profileImage} alt="profile" className="profile-icon" />
          <span className="dropdown-icon"></span>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={logout}>로그아웃</button>
            </div>
          )}
        </div>
      ) : (
        // 로그인되지 않았을 때
        <button onClick={() => navigate("/login-signup")} className="login-button">로그인</button>
      )}
    </nav>
  );
};

export default Navbar;
