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
    ChangeImageButton,
    CameraIcon,

} from './EditMyPage.styles.js';

import tmpProfileImage from "../../assets/login/babyCat.png";
import KakaoIcon from "../../assets/mypage/kakaotalk_sharing_btn_small.png";
import cameraIcon from "../../assets/mypage/IconButton.png"; // 카메라 아이콘 이미지 경로
import { Button, message, Space, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function EditMyPage(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState("판교쩝쩝박사");
    const [tempNickname, setTempNickname] = useState(nickname); // 임시 값 저장
    const [profileImage, setProfileImage] = useState(tmpProfileImage);


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

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]; // 선택된 파일
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfileImage(reader.result); // 선택된 이미지로 프로필 이미지 업데이트
            };

            reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
        } else {
            console.error("No file selected"); // 파일이 선택되지 않은 경우 로그 출력
        }
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
                            <ProfileImage src={profileImage} alt="Profile" />
                            <ChangeImageButton onClick={handleImageChange}>
                                <label htmlFor="file-input" style={{ cursor: "pointer", background: "none", border: "none" }}>
                                    <CameraIcon src={cameraIcon} alt="Change Profile" />
                                </label>
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*" // 이미지 파일만 선택 가능
                                    onChange={handleImageChange}
                                    style={{ display: "none" }} // 파일 입력 숨기기
                                />
                            </ChangeImageButton>
                        </ProfileImageContainer>
                    </InfoRow>
                    <InfoRow>
                        <Label>닉네임</Label>
                        {isEditing ? (
                            <>
                                <Input
                                    value={tempNickname}
                                    onChange={handleInputChange}
                                    style={{ marginRight: 20 }}
                                />
                                <ChangeButton onClick={() => handleSave()}>저장</ChangeButton>
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