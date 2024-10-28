import React, { useState } from "react";
import "./Navbar.css";
import navbarImage from "../../assets/navbar/navbar_image.png"; // 실제 파일 경로에 맞게 수정
import profileImage from "../../assets/navbar/profile_image.png";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          {/* <Link to="/blog">인기 블로그</Link> */}
          인기 블로그
        </li>
        <li>
          {/* <Link to="/criteria">검사 기준</Link> */}
          검사 기준
        </li>
        <li>
          {/* <Link to="/feedback">개선 피드백</Link> */}
          개선 피드백
        </li>
        <li>{/* <Link to="/profile">내 정보</Link> */}내 정보</li>
      </ul>
      {isLoggedIn ? (
        // 로그인 상태일 때
        <div className="profile-container">
          <img src={profileImage} alt="profile" className="profile-icon" />
          <span className="dropdown-icon"></span>
        </div>
      ) : (
        // 로그인되지 않았을 때
        <button className="login-button">로그인/가입</button>
      )}
    </nav>
  );
};

export default Navbar;
