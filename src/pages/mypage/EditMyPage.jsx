import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tmpProfileImage from "../../assets/login/babyCat.png";
import KakaoIcon from "../../assets/mypage/kakaotalk_sharing_btn_small.png";
import { Button, message, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const EntireContainer = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  min-height: 100vh
`

const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh
  
`;

const ProfileContainerDetail = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 15px;
  
`;

const ProfileHeader = styled.h2`
  text-align: left;
  margin-bottom: 80px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%; // 추가
  margin-bottom: 20px;
  
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoRowProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: bold;
  text-align: left;
  flex: 0 0 120px; // 고정 너비로 설정 (원하는 크기로 변경 가능)
  width: 120px;
`;

const Value = styled.span`
  flex: 2;
  display: flex; // 추가
  justify-content: space-between; // 추가: 아이템을 양쪽 끝으로 정렬
  align-items: center; // 추가: 수직 가운데 정렬
`;

const ChangeButton = styled.button`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 60px;
`;

const CustomButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;

  &:first-child {
    background-color: #f1f1f1;
    color: #000;
    border: 1px solid #ccc;
  }

  &:last-child {
    background-color: #4caf50;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const UserTypeIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 90px;
  object-fit: cover;
`;

function EditMyPage(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState("판교쩝쩝박사");
    const [tempNickname, setTempNickname] = useState(nickname); // 임시 값 저장

    const navigate = useNavigate();

    const toggleEdit = () => {
        setIsEditing(!isEditing); // 편집 모드 전환
    };

    const handleInputChange = (e) => {
        setTempNickname(e.target.value);
    };

    const handleSave = () => {
        // 저장 로직 실행
        setNickname(tempNickname); // 닉네임 갱신
        message.success("변경이 완료되었습니다!"); // 성공 메시지 표시
        setIsEditing(false); // 편집 모드 종료
    };

    return (
        <EntireContainer>
            <ProfileContainer>
                <ProfileHeader>내 프로필 수정</ProfileHeader>

                <ProfileContainerDetail>
                    <InfoRowProfile>
                        <Label>프로필 사진</Label>
                    </InfoRowProfile>
                    <InfoRow>
                        <ProfileImageContainer>
                            <ProfileImage src={tmpProfileImage} alt="Profile" />
                        </ProfileImageContainer>
                    </InfoRow>
                    <InfoRow>
                        <Label>닉네임</Label>
                        {isEditing ? (
                            <>
                                <Input
                                    value={tempNickname}
                                    onChange={handleInputChange}
                                    style={{ marginRight: 10 }}
                                />
                            </>
                        ) : (
                            <>
                                <Value>{nickname}</Value>
                                <ChangeButton onClick={() => toggleEdit()}>변경</ChangeButton>
                            </>
                        )}
                    </InfoRow>
                    <InfoRow>
                        <Label>이메일</Label>
                        <Value>
                            22day@kakao.com
                            <UserTypeIcon src={KakaoIcon} alt="Kakao Icon" />
                        </Value>
                    </InfoRow>
                    <InfoRow>
                        <Label>가입일자</Label>
                        <Value>2024.10.20</Value>
                    </InfoRow>
                    <ButtonContainer>
                        <CustomButton onClick={() => navigate("/mypage")}>취소</CustomButton>
                        <CustomButton onClick={handleSave}>저장</CustomButton>
                    </ButtonContainer>
                </ProfileContainerDetail>
            </ProfileContainer>
        </EntireContainer>
    );
}

export default EditMyPage;