import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null); // 닉네임 상태 추가
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken")); // 로컬스토리지에서 가져오기

  // 로그인 메서드
  const login = (newToken, newNickname, newProfileImage, newAccessToken) => {
    setToken(newToken);
    setNickname(newNickname); // 닉네임 저장
    setProfileImage(newProfileImage); // 프로필 이미지 저장
    localStorage.setItem("accessToken", newAccessToken);  // 로컬스토리지에 저장
    setIsLoggedIn(true);

    // localStorage에 저장
    localStorage.setItem('accessToken', newAccessToken);
  };

  // 로그아웃 메서드
  const logout = () => {
    setToken(null);
    setNickname(null);
    setProfileImage(null);
    setIsLoggedIn(false);
    // console.log("로그아웃 완료");

    // localStorage에서 accessToken 삭제
    localStorage.removeItem('accessToken');
    
  };

  // 페이지 새로고침 후에도 accessToken을 가져오도록 설정
  useEffect(() => {});


  return (
    <AuthContext.Provider value={{ isLoggedIn, token, nickname, profileImage, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
