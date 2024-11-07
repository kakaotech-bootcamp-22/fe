import styled from "styled-components";

export const EntireContainer = styled.div`
  background-color: #f5f5f5;
  text-align: center;
  min-height: 100vh
`

export const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  min-height: 100vh
  
`;

export const ProfileContainerDetail = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 15px;
  
`;

export const ProfileHeader = styled.h2`
  text-align: left;
  margin-bottom: 80px;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%; // 추가
  margin-bottom: 20px;
  
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoRowProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-weight: bold;
  text-align: left;
  flex: 0 0 120px; // 고정 너비로 설정 (원하는 크기로 변경 가능)
  width: 120px;
`;

export const Value = styled.span`
  flex: 2;
  display: flex; // 추가
  justify-content: space-between; // 추가: 아이템을 양쪽 끝으로 정렬
  align-items: center; // 추가: 수직 가운데 정렬
`;

export const ChangeButton = styled.button`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 60px;
`;

export const CustomButton = styled.button`
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

export const UserTypeIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 90px;
  object-fit: cover;
`;
