import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './LoadingPage.css';
import chunshikImage from '../../assets/loading/loading_image.webp';

const LoadingPage = () => {
  const { state } = useLocation();
  const { requestId } = state || {};
  const [activeDot, setActiveDot] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 3);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    if (!requestId) {
      console.error('LoadingPage Error: requestId is missing from state');
      alert('요청 처리 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
      navigate('/', { 
        replace: true,
        state: { error: '유효하지 않은 검사 요청입니다.' }  // 홈 컴포넌트에서 에러 메시지 표시 가능
      });
      return;
    }

    const pollingInterval = 5000;
    let intervalId;

    const checkResultStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/review-check/status/${requestId}`);
        const data = response.data;

        if (data.score >= 0) {
          console.log('Result ready:', data);
          navigate('/result', { state: data });
          setLoading(false);
        } else {
          console.log('Result pending... Polling will continue');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || '알 수 없는 오류가 발생했습니다.';
        console.error('LoadingPage Error:', {
          message: errorMessage,
          requestId,
          error: err
        });
        
        setError(errorMessage);
        setLoading(false);
        
        alert('결과를 가져오는 중 오류가 발생했습니다. 메인 페이지로 이동합니다.');
        navigate('/', { 
          replace: true,
          state: { error: errorMessage }
        });
      }
    };

    intervalId = setInterval(checkResultStatus, pollingInterval);
    checkResultStatus();

    return () => {
      console.log('Cleaning up polling interval');
      clearInterval(intervalId);
    };
  }, [requestId, navigate]);

  if (error) {
    return (
      <div className="loading-container">
        <p className="error-text">{error}</p>
        <button 
          className="retry-button"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
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
