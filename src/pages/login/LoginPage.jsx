import React, { useEffect, useState, useRef } from "react";
import loginImage from "../../assets/login/babyCat.png";
import kakaologinImage from "../../assets/login/kakao_login_large_narrow.png";
import googleloginImage from "../../assets/login/google_logo.png";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

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
    const { login, settingLoading } = useAuth();
    const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    let redirectUri = process.env.REACT_APP_REDIRECT_URI;
    const location = useLocation();

    useEffect(() => {
        // Kakao SDK 초기화
        const { Kakao } = window;
        const kakaoJsKey = process.env.REACT_APP_KAKAO_JS_KEY;

        if (Kakao) {
            if (!window.Kakao.isInitialized()) {
                Kakao.init(kakaoJsKey);
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
            console.log("Kakao SDK가 제대로 로드되지 않았거나 초기화되지 않았습니다.");
            return;
        }

        const redirectPath = localStorage.getItem("redirectAfterLoginPath");

        if (redirectPath === "/result") {
            redirectUri = `${redirectUri}/result?redirected=true`;
        } else {
            redirectUri = `${redirectUri}`; // 기본 리다이렉션
        }

        Kakao.Auth.authorize({
            redirectUri: `${redirectUri}`
        });

    };

    const GoogleLoginButton = () => {
        const signIn = useGoogleLogin({
            onSuccess: (res) => {
                console.log(res)
                axios.post(`${API_URL}/auth/google/token`, {
                    access_token: res.access_token,
                })
                    .then(response => {
                        Cookies.set('accessToken', response.data.token);
                        if (window.location.pathname === "/" || window.location.pathname === "/login-signup") {
                            if (window.location.pathname === "/login-signup") {
                                const prevPage = localStorage.getItem("redirectAfterLoginURL");
                                const prevPagePath = localStorage.getItem("redirectAfterLoginPath");
                                if (prevPage) {
                                    const referrerUrl = new URL(prevPage);
                                    if (referrerUrl.pathname === "/result") {
                                        navigate(`${prevPagePath}`);
                                    } else {
                                        navigate("/");
                                    }
                                }
                            } else {
                                navigate("/");
                            }
                        } else {
                            navigate("/");
                        }
                        setTimeout(() => {
                            window.location.reload();
                        }, 100);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            onError: (error) => { console.log(error); }
        });
        return (
            <div onClick={() => signIn()}>
                <GoogleloginButton>
                    <GoogleImage src={googleloginImage} />
                    <GoogleLoginText>구글 계정으로 로그인</GoogleLoginText>
                </GoogleloginButton>
            </div>
        );
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
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLoginButton />
                    </GoogleOAuthProvider>
                </ContainerVertical>
            </Background>
        </Container>
    );
}


export default LoginPage;