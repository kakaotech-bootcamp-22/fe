import React from "react";
import "./Result.css";
import greenChoonsik from "../../assets/result/green-choonsik.png"; // 초록색 라이언 이미지
import yellowChoonsik from "../../assets/result/yellow-choonsik.png"; // 노란색 라이언 이미지
import redChoonsik from "../../assets/result/red-choonsik.png"; // 빨간색 라이언 이미지

const Result = ({ score, url, reviewTitle, reviewContent, judgementReason }) => {
  // 점수에 따라 색상과 이미지 동적으로 설정
  const getScoreStyle = (score) => {
    if (score >= 70) {
      return {
        backgroundColor: "#e9f5e9", // 초록색 배경
        color: "green",
        characterImage: greenChoonsik,
      };
    } else if (score >= 40) {
      return {
        backgroundColor: "#fff8e1", // 노란색 배경
        color: "orange",
        characterImage: yellowChoonsik,
      };
    } else {
      return {
        backgroundColor: "#ffe6e6", // 빨간색 배경
        color: "red",
        characterImage: redChoonsik,
      };
    }
  };

  const { backgroundColor, color, characterImage } = getScoreStyle(score);

  return (
    <div className="result-container">
      {/* URL 섹션 */}
      <div className="url-section">
        <h2>입력하신 URL</h2>
        <p className="url">
          [ <span className="highlight-url">{url}</span> ]에 작성된 리뷰 검사 결과입니다.
        </p>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        className="main-content"
        style={{ backgroundColor: backgroundColor }}
      >
        {/* 왼쪽 섹션: 리뷰 요약 */}
        <div className="left-content">
          <h3 className="title">AI 리뷰 요약 🤖</h3>
          <h4 className="review-title">{reviewTitle}</h4>
          <p className="review-content">{reviewContent}</p>
          <h4 className="judgement-title">왜 이렇게 판단했나요? 🤔</h4>
          <p className="judgement-reason">{judgementReason}</p>
          <p className="fake-report">▶ 가짜 리뷰로 제보하기</p>
          <p className="go-back">← 뒤로가기</p>
        </div>

        {/* 오른쪽 섹션: 점수 및 이미지 */}
        <div className="right-content">
          <h3>이 리뷰의 점수는?</h3>
          <img
            src={characterImage}
            alt="점수 캐릭터"
            className="score-image"
          />
          <h1 className="score" style={{ color }}>
            {score} / 100
          </h1>
          <p className="check-criteria" style={{ color }}>
            ▶ 검사 기준이 궁금하신가요?
          </p>
          <div className="feedback-buttons">
            <button className="feedback-button">👍</button>
            <button className="feedback-button">👎</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
