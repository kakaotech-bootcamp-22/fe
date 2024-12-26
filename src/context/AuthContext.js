import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(response.data?.isLoggedIn ===true);
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null); // 닉네임 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가
  const [platform, setPlatform] = useState(null); // 플랫폼 추가
  const [createdAt, setCreatedAt] = useState(null); // 플랫폼 추가
  const [email, setEmail] = useState(null);
  
  const [loading, setLoading] = useState(true); // 로딩 상태

  const [writtenReviewCount, setWrittenReviewCount] = useState(null);
  const [receivedLikeCount, setReceivedLikeCount] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;


  // 로그인 메서드
  const login = (newToken, newNickname, newProfileImage, newPlatform, newCreatedAt, newEmail,) => {
    setToken(newToken);
    setNickname(newNickname); // 닉네임 저장
    setProfileImage(newProfileImage); // 프로필 이미지 저장
    setPlatform(newPlatform) // 플랫폼 저장
    setCreatedAt(newCreatedAt)
    setIsLoggedIn(true);
    setEmail(newEmail)

    fetchUserActivity();
  };

  const loginFail = (newLogin) => {
    setIsLoggedIn(newLogin);
  };

  const settingLoading = (newLoading) => {
    setLoading(newLoading);
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

    setWrittenReviewCount(null);
    setReceivedLikeCount(null);
  };

  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  const fetchUserActivity = async () => {
    try{
      const response = await axios.get(requests.fetchUserActivity);
      setWrittenReviewCount(response.data.reviewCount);
      setReceivedLikeCount(response.data.likeCount);
    } catch(error) {
      console.error("활동 데이터를 가져오는 중 오류 발생: ", error);
    };
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        token, 
        nickname, 
        profileImage, 
        platform, 
        createdAt, 
        email, 
        writtenReviewCount, 
        receivedLikeCount, 
        loading,
        login, 
        logout, 
        updateProfileImage,
        loginFail,
        settingLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
