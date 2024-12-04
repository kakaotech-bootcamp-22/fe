import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoadingPage.css';
import chunshikImage from '../../assets/loading/loading_image.webp'; // 춘식이 이미지

const LoadingPage = () => {
  const { state } = useLocation(); // useLocation을 통해 전달된 state 접근
  const { requestId } = state || {}; // state에서 requestId 추출
  const [activeDot, setActiveDot] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 3); // 0, 1, 2 반복
    }, 500); // 0.5초마다 변경

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    if (!requestId) {
      setError("Request ID가 전달되지 않았습니다.");
      setLoading(false);
      return;
    }

    const pollingInterval = 5000; // 5초 간격으로 폴링
    let intervalId;

    const checkResultStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/review-check/status/${requestId}`);
        const data = response.data;

        if (data.score >= 0) {
          // 결과가 준비되었으면 페이지 이동
          navigate('/result', { state: data });
          setLoading(false);
        } else {
          console.log('결과 생성 중...');
        }
      } catch (err) {
        console.error('결과 확인 중 오류 발생:', err);
        setError('결과를 가져오는 중 문제가 발생했습니다.');
        setLoading(false);
      }
    };

    // 폴링 시작
    intervalId = setInterval(checkResultStatus, pollingInterval);
    checkResultStatus(); // 첫 번째 요청 즉시 호출

    // 컴포넌트가 언마운트 되면 폴링 중지
    return () => clearInterval(intervalId);
  }, [requestId, navigate]);

  if (error) {
    return (
      <div className="loading-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (loading) {
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
  }

  return null;
};

export default LoadingPage;
