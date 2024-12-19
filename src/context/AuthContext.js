import { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const [writtenReviewCount, setWrittenReviewCount] = useState(null);
  const [receivedLikeCount, setReceivedLikeCount] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(requests.fetchAuthStatus);
        const { isLoggedIn, nickname, profileImage, platform, createdAt, email } = response.data;

        setIsLoggedIn(isLoggedIn);
        if (isLoggedIn) {
          setNickname(nickname);
          setProfileImage(profileImage);
          setPlatform(platform);
          setCreatedAt(createdAt);
          setEmail(email);
          fetchUserActivity();
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (newToken, newNickname, newProfileImage, newPlatform, newCreatedAt, newEmail) => {
    setToken(newToken);
    setNickname(newNickname);
    setProfileImage(newProfileImage);
    setPlatform(newPlatform);
    setCreatedAt(newCreatedAt);
    setEmail(newEmail);
    setIsLoggedIn(true);
    fetchUserActivity();
  };

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

  const fetchUserActivity = async () => {
    try {
      const response = await axios.get(requests.fetchUserActivity);
      setWrittenReviewCount(response.data.reviewCount);
      setReceivedLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('활동 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const settingLoading = (newLoading) => {
    setLoading(newLoading);
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
        updateProfileImage: setProfileImage,
        settingLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
