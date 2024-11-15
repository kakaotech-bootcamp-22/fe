import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null); // 닉네임 상태 추가
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가

  // 로그인 메서드
  const login = (newToken, newNickname, newProfileImage) => {
    setToken(newToken);
    setNickname(newNickname); // 닉네임 저장
    setProfileImage(newProfileImage); // 프로필 이미지 저장
    setIsLoggedIn(true);
  };

  // 로그아웃 메서드
  const logout = () => {
    setToken(null);
    setNickname(null);
    setProfileImage(null);
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, token, nickname, profileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
