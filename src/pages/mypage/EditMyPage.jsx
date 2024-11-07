import React, { useEffect, useState } from "react";
import {
    EntireContainer,
    ProfileContainer,
    ProfileContainerDetail,
    ProfileHeader,
    ProfileImageContainer,
    ProfileImage,
    InfoRow,
    InfoRowProfile,
    Label,
    Value,
    ChangeButton,
    ButtonContainer,
    CustomButton,
    UserTypeIcon,
  } from './EditMyPage.styles.js'; 

import tmpProfileImage from "../../assets/login/babyCat.png";
import KakaoIcon from "../../assets/mypage/kakaotalk_sharing_btn_small.png";
import { Button, message, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

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