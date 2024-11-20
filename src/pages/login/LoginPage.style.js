import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px); /* 예: 네비게이션 바 높이가 60px일 경우 */
    padding: 20px;
    overflow: auto; /* 내용이 초과될 경우 스크롤 추가 */
    box-sizing: border-box; /* 패딩 포함하여 박스 크기 계산 */
`

export const ContainerVertical = styled.div`
    flex-direction: column;
    align-items: center;
    display: flex;
`;

export const Background = styled.div`
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

export const LoginImage = styled.img`
    width: 200px; 
    height: auto;
    margin-bottom: 20px; 
`;

export const TextBox = styled.div`
    width: 220px; 
`

export const Title = styled.h1`
    margin: 5px 0; /* 위아래 간격을 줄이기 위해 설정 */
    margin-bottom: 100px; /* 요소 바깥쪽의 아래 여백 */
    font-size: 43px; /* 글꼴 크기 설정 */
`;

export const Subtitle = styled.h2`
    margin: 5px 0; /* 위아래 간격을 줄이기 위해 설정 */
    font-size: 24px; /* 글꼴 크기 설정 */
    text-align: left; /* 텍스트 좌측 정렬 */
    width: 100%; /* 부모 컨테이너 전체 너비 사용 */
`;

export const KakaologinButton = styled.button`
    cursor: pointer;
    border: none;
    background-color: #F5F5F5;
`


export const GoogleloginButton = styled.button`
    margin-top: 30px; /* 버튼 위에 빈 공간 추가 */
    width: 366px; 
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

export const GoogleImage = styled.img`
    width: 70px; 
    height: auto;
    margin-right: 20px; /* 텍스트와 간격 조절 */

`
export const GoogleLoginText = styled.span`
    font-family: 'Roboto', sans-serif; /* 글꼴 설정 */
    font-size: 28px; /* 글꼴 크기 설정 */
    font-weight: bold; /* 글꼴 두께 설정 */
    color: #333; /* 글자 색상 설정 */
`;
