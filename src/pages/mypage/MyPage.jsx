import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tmpProfileImage from "../../assets/login/babyCat.png";
import KakaoIcon from "../../assets/mypage/kakaotalk_sharing_btn_small.png";
import GoogleIcon from "../../assets/mypage/web_neutral_rd_na@4x.png";

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { Button, message, Popconfirm } from 'antd';
import axios from '../../api/axios';
import requests from '../../api/requests';



const EntireContainer = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  min-height: 90vh;
  min-width: 60vh;
  min-width: 1000px; 
`

/* 프로필 컨테이너 */
const ProfileContainer = styled.div`
  max-width: 60%;
  margin: 0 auto;
  background-color: #ffffff;
  text-align: center;
  min-height: 90vh;
  flex-direction: column;
  justify-content: space-between; /* 위아래로 공간을 분배 */
  min-width: 500px; 
  padding: 20px;

`

/* 프로필 정보 */
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 50px;
  margin: 5px;
  border-radius: 15px; /* 모서리를 둥글게 하되 원형이 되지 않도록 설정 */
  
`

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  object-fit: cover;
  border: 1px solid #353535; /* 원하는 색상과 두께로 테두리 추가 */
`;

const ProfileDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  text-align: left;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const ProfileEmail = styled.p`
  margin: 5px 0;
  color: #666;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #353535; /* 원하는 색상과 두께로 테두리 추가 */
`;

const InfoBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InfoBox = styled.div`
  flex: 1;
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 15px;
  text-align: center;
  margin: 5px;
  
`;

const InfoBoxTitle = styled.h3`
  margin: 5px 0;
  font-size: 1rem;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
`;

const InfoBoxCount = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  text-align: right; /* 텍스트를 오른쪽 정렬 */
`;

const FooterButton = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 15px;
  text-align: center;
  width: 98%;
  text-decoration: underline;
`;

const EntireTitle = styled.h1`
  text-align: left; /* 왼쪽 정렬 */
  margin-left: 3px; /* 여백이 필요하면 값 조정 */
  font-size: 1.7rem; /* 원하는 크기로 설정 */
`;

const KakaoButton = styled.div`
  display: inline-flex; /* inline-flex로 설정하여 너비를 내용에 맞춤 */
  align-items: center;
  background-color: #ffeb3b; /* 노란색 배경 */
  border-radius: 25px; /* 둥근 모서리 */
  padding: 10px 20px;
  border: 1px solid #e0e0e0; /* 외곽선 */
  
`;

const GoogleButton = styled.div`
  display: inline-flex; /* inline-flex로 설정하여 너비를 내용에 맞춤 */
  align-items: center;
  background-color: #ffffff; /* 노란색 배경 */
  border-radius: 25px; /* 둥근 모서리 */
  padding: 10px 20px;
  border: 1px solid #e0e0e0; /* 외곽선 */
  
`;
const Left = styled.div`
  text-align: left; /* 내부 요소를 왼쪽으로 정렬 */
  margin-bottom: 20px; /* 필요에 따라 여백 설정 */
  margin-left: 5px;
`;


const IconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const KakaoText = styled.span`
  font-size: 1rem;
  color: #000;
`;

const GoogleText = styled.span`
  font-size: 1rem;
  color: #000;
`;


function MyPage(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    isLoggedIn,
    login,
    logout,
    nickname,
    profileImage,
    platform,
    createdAt,
    email,
    writtenReviewCount,
    receivedLikeCount,
    loading,
    settingLoading,
    loginFail,
  } = useAuth();
  const [newNickname, setNickname] = useState(nickname);
  const [newProfileImage, setProfileImage] = useState(profileImage);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const confirm = (e) => {
    console.log(e);
    accountDeactivation();
  };

  const cancel = (e) => {
    console.log(e);
    message.error('회원탈퇴가 취소되었습니다.');
  };

  const accountDeactivation = async () => {
      try{ //로그아웃
        await axios.get(requests.fetchUserDelete);
        logout(); // AuthContext 상태 리셋
        navigate("/")
        settingLoading(false);
        message.success('회원탈퇴가 완료되었습니다.');
      } catch(error) {
        console.error("회원탈퇴 중 에러 발생", error);
        message.error('회원탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요.');
      };
  };

  useEffect( () => {
      try{
        if (!document.cookie.includes("jwtToken")) {
          console.log("No valid JWT cookie. Skipping status check.");
          navigate("/");
          settingLoading(false);
          return;
        }
        const response = axios.get(requests.fetchAuthStatus);
        if (response.data.loggedIn) {
          // 쿠키에서 JWT 토큰을 가져와 로그인 상태 처리
          let str = response.data.nickname;
              // 문자열에 \uad가 포함되어 있는지 검사
              if (str.includes("\u00ad")) {
                str = str.slice(1); // 인덱스 1부터 자르기
              }
          login(
            response.data.jwtToken,
            str,
            response.data.userImage,
            response.data.platform,
            response.data.createdAt,
            response.data.email
          );
          settingLoading(false);
        }
        document.cookie = "jwtToken=; path=/; max-age=0";
      } catch(error) {
        setErrorMessage("로그인 상태를 확인할 수 없습니다.");
      };
    //}
  }, []); // 한 번만 실행되도록 빈 배열을 의존성 배열에 추가

  return (
    <EntireContainer>
      <ProfileContainer>
        <EntireTitle>내 프로필</EntireTitle>
        <Left>
          {platform === "kakao" ? (
            <KakaoButton>
              <IconImage src={KakaoIcon} alt="Kakao Icon" />
              <KakaoText>{email}</KakaoText>
            </KakaoButton>
          ) : (
            <GoogleButton>
              <IconImage src={GoogleIcon} alt="Google Icon" />
              <GoogleText>{email}</GoogleText>
            </GoogleButton>
          )}

        </Left>
        <ProfileInfo>
          <ProfileImage src={profileImage} alt="Profile Image" />
          <ProfileDetails>
            <ProfileName>{nickname}</ProfileName>
            {platform === "kakao" ? (
              <ProfileEmail>{email}</ProfileEmail>
            ) : (
              <ProfileEmail>{email}</ProfileEmail>
            )}
          </ProfileDetails>
          <EditButton onClick={() => navigate("/edit-mypage")}>수정</EditButton>
        </ProfileInfo>
        <InfoBoxes>
          <InfoBox>
            <InfoBoxTitle>작성한 후기 수</InfoBoxTitle>
            <InfoBoxCount>
              {writtenReviewCount}
              <span style={{ fontWeight: 'normal' }}>개</span>
            </InfoBoxCount>
          </InfoBox>
          <InfoBox>
            <InfoBoxTitle>받은 좋아요 수</InfoBoxTitle>
            <InfoBoxCount>
              {receivedLikeCount}
              <span style={{ fontWeight: 'normal' }}>개</span>
            </InfoBoxCount>
          </InfoBox>
        </InfoBoxes>
        <>
          <Popconfirm
            title="주의"
            description={<>회원탈퇴를 진행하시겠습니까?<br /></>}
            onConfirm={confirm}
            onCancel={cancel}
            okText="회원 탈퇴"
            cancelText="취소"
          >
            <FooterButton>회원탈퇴</FooterButton>
          </Popconfirm>
        </>
      </ProfileContainer>
    </EntireContainer>
  );
}

export default MyPage;