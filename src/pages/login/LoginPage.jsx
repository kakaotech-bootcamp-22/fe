import React, { useEffect, useState } from "react";
import styled from "styled-components";
import loginImage from "../../assets/login/babyCat.png"
import kakaologinImage from "../../assets/login/kakao_login_large_narrow.png"
import googleloginImage from "../../assets/login/google_logo.png"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from "../../context/AuthContext";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const ContainerVertical = styled.div`
    flex-direction: column;
    align-items: center;
    display: flex;
`;

const Background = styled.div`
    width: 665px;
    height: 910px;
    background-color: #F5F5F5;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

const LoginImage = styled.img`
    width: 200px; 
    height: auto;
    margin-bottom: 20px; 
`;

const TextBox = styled.div`
    width: 220px; 
`

const Title = styled.h1`
    margin: 5px 0; /* 위아래 간격을 줄이기 위해 설정 */
    margin-bottom: 100px; /* 요소 바깥쪽의 아래 여백 */
    font-size: 43px; /* 글꼴 크기 설정 */
`;

const Subtitle = styled.h2`
    margin: 5px 0; /* 위아래 간격을 줄이기 위해 설정 */
    font-size: 24px; /* 글꼴 크기 설정 */
    text-align: left; /* 텍스트 좌측 정렬 */
    width: 100%; /* 부모 컨테이너 전체 너비 사용 */
`;

const GoogleImage = styled.img`
    width: 70px; 
    height: auto;
    margin-right: 20px; /* 텍스트와 간격 조절 */

`

const KakaologinButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: #F5F5F5;
`

const GoogleloginButton = styled.button`
    margin-top: 30px; /* 버튼 위에 빈 공간 추가 */
    width: 360px; 
    height: auto;
    border-radius: 10px;
    border: none;
    background-color:#FFFFFF;
    display: flex;
    cursor: pointer;
    align-items: center; /* 수직 정렬 */
    padding: 10px; /* 내부 여백 추가 */
    justify-content: center;
`

const GoogleLoginText = styled.span`
    font-family: 'Roboto', sans-serif; /* 글꼴 설정 */
    font-size: 28px; /* 글꼴 크기 설정 */
    font-weight: bold; /* 글꼴 두께 설정 */
    color: #333; /* 글자 색상 설정 */
`;



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
                console.log("Kakao SDK initialized:", Kakao.isInitialized());
                setIsKakaoInitialized(true); // 초기화 성공 시 상태 업데이트
            }
        } else {
            setErrorMessage("Kakao SDK 로드에 실패했습니다.");
        }

        // 리다이렉트된 경우 토큰 처리
        if (Kakao && Kakao.Auth.getAccessToken()) {
            const token = Kakao.Auth.getAccessToken();
            login(token); // `AuthProvider`에 토큰 저장
            console.log("카카오 로그인 성공 - 토큰:", token);
        }

    }, [login]); // `login`을 의존성으로 추가

    const handleLogin = () => {
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