import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';
import chunshikImage from '../../assets/loading/loading_image.webp'; // 춘식이 이미지

const LoadingPage = ({ requestId }) => { // requestId를 props로 가져옴
  const [activeDot, setActiveDot] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 3); // 0, 1, 2 반복
    }, 500); // 0.5초마다 변경

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const pollingInterval = 5000; // 5초 간격으로 폴링
    let intervalId;

    const checkResultStatus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/result/${requestId}`); // requestId 사용
        const result = await response.json();

        if (result.status === 'READY') {
          navigate('/result', { state: result.data });
        }
      } catch (err) {
        console.error('데이터를 가져오는 데 실패했습니다.', err);
      }
    };

    // 폴링 시작
    intervalId = setInterval(checkResultStatus, pollingInterval);
    checkResultStatus(); // 첫 번째 요청 즉시 호출

    // 컴포넌트가 언마운트 되면 폴링 중지
    return () => clearInterval(intervalId);
  }, [requestId, navigate]); // requestId 추가

  return (
    <div className="loading-container">
      <img src={chunshikImage} alt="Loading character" className="loading-image" />
      <p>Loading...</p>
      <div className="dots">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={`dot ${dot === activeDot ? 'active' : ''}`}
          ></span>
        ))}
      </div>
      <p className="loading-text">URL을 AI 모델이 분석하고 있어요!</p>
    </div>
  );
};

export default LoadingPage;
