import React from 'react';
import resultImage from "../../assets/result/result_image.png";

const ResultPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <img
        src={resultImage}
        alt="결과 페이지 디자인"
        style={{ maxWidth: '100%', height: 'auto' }} // 이미지 크기 자동 조정
      />
    </div>
  );
};

export default ResultPage;
