import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null); // 닉네임 상태 추가
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가
  const [platform, setPlatform] = useState(null); // 플랫폼 추가
  const [createdAt, setCreatedAt] = useState(null); // 플랫폼 추가
  const [email, setEmail] = useState(null);

  // 로그인 메서드
  const login = (newToken, newNickname, newProfileImage, newPlatform, newCreatedAt, newEmail) => {
    setToken(newToken);
    setNickname(newNickname); // 닉네임 저장
    setProfileImage(newProfileImage); // 프로필 이미지 저장
    setPlatform(newPlatform) // 플랫폼 저장
    setCreatedAt(newCreatedAt)
    setIsLoggedIn(true);
    setEmail(newEmail)
  };

  // 로그아웃 메서드
  const logout = () => {
    setToken(null);
    setNickname(null);
    setProfileImage(null);
    setPlatform(null);
    setIsLoggedIn(false);
    setCreatedAt(null);
    setEmail(null);
  };

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  useEffect(() => {
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, nickname, profileImage, platform, createdAt, email, login, logout, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
