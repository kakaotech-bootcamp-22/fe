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
    const [kakaoCode, setKakaoCode] = useState("");

    useEffect(() => {
        console.log("useEffect 실행됨");
        // Kakao SDK 초기화
        const { Kakao } = window;
        if (Kakao) {
            if (!Kakao.isInitialized()) {
                Kakao.init("826a723547312cf55037f1bf217f293b");
                console.log("Kakao SDK initialized:", Kakao.isInitialized());
                setIsKakaoInitialized(true); // 초기화 성공 시 상태 업데이트
            }
        } else {
            setErrorMessage("Kakao SDK 로드에 실패했습니다.");
        }

        // // 리다이렉트된 경우 토큰 처리
        // const token = Kakao && Kakao.Auth.getAccessToken();
        // if (token) {
        //     login(token); // `AuthProvider`에 토큰 저장
        //     console.log("카카오 로그인 성공 - 토큰:", token);

        //     // axios 요청 추가 
        //     axios
        //         .post("http://localhost:8080/auth/kakao/token", {
        //             token: token,
        //         })
        //         .then((response) => {
        //             console.log("백엔드 응답:", response.data);
        //         })
        //         .catch((error) => {
        //             console.error("백엔드와 통신 중 에러 발생:", error);
        //         });
        // }

        //     // 리다이렉트된 경우 인가 코드 확인
        //     const urlParams = new URLSearchParams(window.location.search);
        //     const code = urlParams.get('code');
        //     if (code) {
        //         setKakaoCode(code);  // 받은 인가 코드를 상태에 저장
        //         console.log("Received Kakao authorization code:", code);

        //         // 받은 인가 코드를 백엔드로 전송하여 토큰을 요청
        //         axios
        //             .post("http://localhost:8080/auth/kakao/token", { code: code })
        //             .then((response) => {
        //                 console.log("백엔드 응답:", response.data);
        //                 // 받은 액세스 토큰 등을 상태나 Context에 저장
        //             })
        //             .catch((error) => {
        //                 console.error("백엔드와 통신 중 에러 발생:", error);
        //             });
        //     }
        // }, [login]); // `login`을 의존성으로 추가
    });

    const handleLogin = () => {
        const { Kakao } = window;
        if (!Kakao || !Kakao.isInitialized()) {
            setErrorMessage("Kakao SDK가 로드되지 않았거나 초기화되지 않았습니다.");
            console.log("Kakao SDK가 제대로 로드되지 않았거나 초기화되지 않았습니다.");
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
                    <KakaologinButton onClick={handleLogin}>
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