import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tmpProfileImage from "../../assets/login/babyCat.png";
import KakaoIcon from "../../assets/mypage/kakaotalk_sharing_btn_small.png";


const EntireContainer = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  min-height: 100vh
`

/* 프로필 컨테이너 */
const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  min-height: 100vh
`

/* 프로필 정보 */
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px; /* 모서리를 둥글게 하되 원형이 되지 않도록 설정 */
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
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffffff;
  position: absolute;
  bottom: 20px; /* 하단에서 20px 떨어짐 */
  cursor: pointer;
  text-decoration: underline; /* 텍스트 밑줄 추가 */
`;

const EntireTitle = styled.h1`
  text-align: left; /* 왼쪽 정렬 */
  margin-left: 10px; /* 여백이 필요하면 값 조정 */
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
const Left = styled.div`
  text-align: left; /* 내부 요소를 왼쪽으로 정렬 */
  margin-bottom: 20px; /* 필요에 따라 여백 설정 */
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


function MyPage(props) {

    return (
        <EntireContainer>
            <ProfileContainer>
                <EntireTitle>내 프로필</EntireTitle>
                <Left>
                    <KakaoButton>
                        <IconImage src={KakaoIcon} alt="Kakao Icon" />
                        <KakaoText>22day@kakao.com</KakaoText>
                    </KakaoButton>
                </Left>
                <ProfileInfo>
                    <ProfileImage src={tmpProfileImage} alt="Profile Image" />
                    <ProfileDetails>
                        <ProfileName>판교쩝쩝박사</ProfileName>
                        <ProfileEmail>22day@kakao.com</ProfileEmail>
                    </ProfileDetails>
                    <EditButton>수정</EditButton>
                </ProfileInfo>
                <InfoBoxes>
                    <InfoBox>
                        <InfoBoxTitle>발견한 가짜 리뷰</InfoBoxTitle>
                        <InfoBoxCount>13개</InfoBoxCount>
                    </InfoBox>
                    <InfoBox>
                        <InfoBoxTitle>작성한 후기</InfoBoxTitle>
                        <InfoBoxCount>4개</InfoBoxCount>
                    </InfoBox>
                </InfoBoxes>
                <FooterButton>회원탈퇴</FooterButton>
            </ProfileContainer>
        </EntireContainer>
    );
}

export default MyPage;