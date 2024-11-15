import React, { useEffect, useState } from "react";
import styled from "styled-components";

import loginImage from "../../assets/login/babyCat.png"
import kakaologinImage from "../../assets/login/kakao_login_large_narrow.png"
import googleloginImage from "../../assets/login/google_logo.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

import {
    Container,
    ContainerVertical,
    Background,
    LoginImage,
    TextBox,
    Title,
    Subtitle,
    GoogleImage,
    KakaologinButton,
    GoogleloginButton,
    GoogleLoginText,
} from './LoginPage.style.js';

function LoginPage(props) {
    const { login } = useAuth();
    const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Kakao SDK 초기화
        const { Kakao } = window;
        if (Kakao) {
            if (!Kakao.isInitialized()) {
                Kakao.init("826a723547312cf55037f1bf217f293b");
                setIsKakaoInitialized(true); // 초기화 성공 시 상태 업데이트
            }
        } else {
            setErrorMessage("Kakao SDK 로드에 실패했습니다.");
        }
    });

    const handleKakaoLogin = () => {
        const { Kakao } = window;
        if (!Kakao || !Kakao.isInitialized()) {
            setErrorMessage("Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.");
            return;
        }

        Kakao.Auth.authorize({
            redirectUri: "http://localhost:3000/", // 리다이렉트할 페이지
        });

    };

    const handleLogout = () => {
        const { Kakao } = window;
        Kakao.Auth.logout(() => {
            // 로그아웃 후 페이지 새로고침
            window.location.reload();
        });
    }


    return (
        <Container>
            <Background>
                <ContainerVertical>
                    <LoginImage src={loginImage} className="login_image" />
                    <TextBox>
                        <Subtitle>가짜 리뷰 판독기</Subtitle>
                        <Title>잡았다 요놈 !</Title>
                    </TextBox>
                    <KakaologinButton onClick={handleKakaoLogin}>
                        <img src={kakaologinImage} />
                    </KakaologinButton>
                    <GoogleloginButton>
                        <GoogleImage src={googleloginImage} />
                        <GoogleLoginText> 구글 계정으로 로그인 </GoogleLoginText>
                    </GoogleloginButton>
                </ContainerVertical>
            </Background>
        </Container>
    );

}

export default LoginPage;