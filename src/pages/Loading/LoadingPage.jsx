import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Spin, message } from 'antd'; // Ant Design 컴포넌트 추가
import './LoadingPage.css';
import chunshikImage from '../../assets/loading/loading_image.webp';

const LoadingPage = () => {
  const { state } = useLocation();
  const { requestId } = state || {};
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!requestId) {
      console.error('LoadingPage Error: requestId is missing from state');
      message.error('유효하지 않은 검사 요청입니다.');
      navigate('/', { 
        replace: true,
        state: { error: '유효하지 않은 검사 요청입니다.' }
      });
      return;
    }

    const pollingInterval = 5000;
    let intervalId;

    const checkResultStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/review-check/status/${requestId}`, {
          // 요청 헤더 로깅을 위한 인터셉터 추가
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = response.data;

        if (data.score >= 0) {
          console.log('Result ready:', data);
          message.success('분석이 완료되었습니다!');
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
        
        message.error('결과를 가져오는 중 오류가 발생했습니다.');
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

  return (
    <div className="loading-container">
      <img src={chunshikImage} alt="Loading character" className="loading-image" />
      <Spin size="large" />
      <div className="loading-text">
        <h2>URL을 AI 모델이 분석하고 있어요!</h2>
        <p>잠시만 기다려 주세요...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
