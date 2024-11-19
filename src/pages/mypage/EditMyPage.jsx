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
import GoogleIcon from "../../assets/mypage/web_neutral_rd_na@4x.png";
import cameraIcon from "../../assets/mypage/IconButton.png"; // 카메라 아이콘 이미지 경로
import { Button, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Flex, Input, Typography } from 'antd';
import { useAuth } from "../../context/AuthContext";
import imageCompression from 'browser-image-compression';


function EditMyPage(props) {

    const { isLoggedIn, login, logout, nickname, profileImage, platform, createdAt } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newNickname, setNickname] = useState(nickname);
    const [newProfileImage, setProfileImage] = useState(profileImage);
    const [errorMessage, setErrorMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(profileImage); // 미리보기 이미지 상태 


    const navigate = useNavigate();

    const toggleEdit = () => {
        setIsEditing(!isEditing); // 편집 모드 전환
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        // 유효성 검사: 한글, 영어, 숫자 조합 확인
        const isValid = /^[a-zA-Z0-9가-힣]*$/.test(value);
        if (!isValid) {
            setErrorMessage("닉네임은 한글, 영어 또는 숫자만 사용할 수 있습니다."); // 에러 메시지 설정
        } else {
            setErrorMessage(""); // 에러 메시지 초기화
        }

        setNickname(value); // 입력값 업데이트
    };

    const handleImageChange = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]; // 선택된 파일

            try {
                // 이미지 압축 설정
                const options = {
                    maxSizeMB: 0.5, // 최대 크기 설정
                    maxWidthOrHeight: 300, // 최대 너비 또는 높이 설정
                    useWebWorker: true, // 웹 워커 사용 설정 
                };

                const compressedFile = await imageCompression(file, options);

                const reader = new FileReader();
                reader.onloadend = () => {
                    console.log('File successfully read:', reader.result); 
                    setProfileImage(reader.result); 
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing image:", error);
                message.error("이미지 압축 중 오류가 발생했습니다.");
            }
        } else {
            console.error("No file selected"); // 파일이 선택되지 않은 경우 출력
        }
    };

    const handleSave = async () => {
        // 저장 로직 실행
        if (errorMessage) {
            message.error("유효한 닉네임을 입력해주세요.");
            return;
        }

        try {
            // 파일과 닉네임 동시 전송
            const formData = new FormData();
            formData.append('nickname', newNickname);
            if (newProfileImage) {
                formData.append('profileImage', newProfileImage);
            }

            const response = await fetch('/api/update-profile', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                message.success("변경이 완료되었습니다!");
                setNickname(result.updatedNickname);
                setProfileImage(result.updatedProfileImage);
            } else {
                message.error("프로필을 업데이트하는 데 실패했습니다.");
                setNickname(nickname);
                setProfileImage(profileImage);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error("프로필 업데이트 중 오류가 발생했습니다.");
            setNickname(nickname);
            setProfileImage(profileImage);
        }
        setIsEditing(false);

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
                            <ProfileImage src={newProfileImage} alt="Profile" />
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
                    <InfoRow style={{ display: 'flex', alignItems: 'center' }}>
                        <Label>닉네임</Label>
                        {isEditing ? (
                            <>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Input
                                        count={{
                                            show: true,
                                            max: 20,

                                        }}
                                        value={newNickname}
                                        onChange={handleInputChange}
                                        style={{ width: 270, flex: 1 }}
                                        maxLength={20}
                                    />
                                    {errorMessage && (
                                        <div style={{ color: 'red', marginTop: '5px', marginRight: '35px', fontSize: '12px' }}>
                                            {errorMessage}
                                        </div>
                                    )}
                                </div>
                                <ChangeButton onClick={handleSave}>저장</ChangeButton>

                            </>
                        ) : (
                            <>
                                <Value>{newNickname}</Value>
                                <ChangeButton onClick={() => toggleEdit()}>변경</ChangeButton>
                            </>
                        )}
                    </InfoRow>
                    <InfoRow>
                        <Label>이메일</Label>
                        {platform === "kakao" ? (
                            <Value>
                                tmp@kakao.com
                                <UserTypeIcon src={KakaoIcon} alt="Kakao Icon" />
                            </Value>
                        ) : (
                            <Value>
                                tmp@gmail.com
                                <UserTypeIcon src={GoogleIcon} alt="Kakao Icon" />
                            </Value>
                        )}

                    </InfoRow>
                    <InfoRow>
                        <Label>가입일자</Label>
                        <Value>{createdAt}</Value>
                    </InfoRow>
                    <ButtonContainer>
                        <CustomButton onClick={() => navigate("/mypage")}>취소</CustomButton>
                        <CustomButton onClick={handleSave}>저장</CustomButton>
                    </ButtonContainer>
                </ProfileContainerDetail>
            </ProfileContainer>
        </EntireContainer >
    );
};

export default EditMyPage;