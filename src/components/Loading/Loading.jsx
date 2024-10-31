// src/components/Loading.jsx
import React, { useEffect, useState } from 'react';
import './Loading.css';
import chunshikImage from '../../assets/loading/loading_image.webp'; // 춘식이 이미지

const Loading = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prevDot) => (prevDot + 1) % 3); // 0, 1, 2 반복
    }, 500); // 0.5초마다 변경

    return () => clearInterval(interval);
  }, []);

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

export default Loading;
