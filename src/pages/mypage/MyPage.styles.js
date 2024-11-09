import styled from "styled-components";

export const EntireContainer = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  min-height: 100vh
`

/* 프로필 컨테이너 */
export const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위아래로 공간을 분배 */
`

/* 프로필 정보 */
export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px; /* 모서리를 둥글게 하되 원형이 되지 않도록 설정 */
`

export const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  object-fit: cover;
  border: 1px solid #353535; /* 원하는 색상과 두께로 테두리 추가 */
`;

export const ProfileDetails = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  text-align: left;
 
`;

export const ProfileName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const ProfileEmail = styled.p`
  margin: 5px 0;
  color: #666;
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
  border: 1px solid #353535; /* 원하는 색상과 두께로 테두리 추가 */
`;

export const InfoBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const InfoBox = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 5px;
  
`;

export const InfoBoxTitle = styled.h3`
  margin: 5px 0;
  font-size: 1rem;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
`;

export const InfoBoxCount = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  text-align: right; /* 텍스트를 오른쪽 정렬 */
`;

export const FooterButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ffffff;
  cursor: pointer;
  text-decoration: underline; /* 텍스트 밑줄 추가 */
  margin-top: auto; /* 나머지 공간을 채우기 위해 추가 */
`;

export const EntireTitle = styled.h1`
  text-align: left; /* 왼쪽 정렬 */
  margin-left: 10px; /* 여백이 필요하면 값 조정 */
  font-size: 1.7rem; /* 원하는 크기로 설정 */
`;

export const KakaoButton = styled.div`
  display: inline-flex; /* inline-flex로 설정하여 너비를 내용에 맞춤 */
  align-items: center;
  background-color: #ffeb3b; /* 노란색 배경 */
  border-radius: 25px; /* 둥근 모서리 */
  padding: 10px 20px;
  border: 1px solid #e0e0e0; /* 외곽선 */
  
`;

export const Left = styled.div`
  text-align: left; /* 내부 요소를 왼쪽으로 정렬 */
  margin-bottom: 20px; /* 필요에 따라 여백 설정 */
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const KakaoText = styled.span`
  font-size: 1rem;
  color: #000;
`;