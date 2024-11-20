import React from "react";
import "./ResultPage.css";
import greenLion from "../../assets/result/green-choonsik.png";
import yellowLion from "../../assets/result/yellow-choonsik.png";
import redLion from "../../assets/result/red-choonsik.png";

const ResultPage = ({ blogUrl, summaryTitle, summaryText, score, evidence }) => {
  // 점수에 따라 스타일 및 이미지 변경
  const getScoreStyle = (score) => {
    if (score >= 70) {
      return {
        backgroundColor: "#e9f5e9",
        color: "green",
        characterImage: greenLion,
      };
    } else if (score >= 40) {
      return {
        backgroundColor: "#fff8e1",
        color: "orange",
        characterImage: yellowLion,
      };
    } else {
      return {
        backgroundColor: "#ffe6e6",
        color: "red",
        characterImage: redLion,
      };
    }
  };

  const { backgroundColor, color, characterImage } = getScoreStyle(score);

  return (
    <div className="result-container">
      <div className="url-section">
        <h2>입력하신 URL</h2>
        <p className="url">
          [ <span className="highlight-url">{blogUrl}</span> ]에 작성된 리뷰 검사 결과입니다.
        </p>
      </div>
      <div className="main-content" style={{ backgroundColor }}>
        <div className="left-content">
          <h3 className="title">AI 리뷰 요약 🤖</h3>
          <h4 className="review-title">{summaryTitle}</h4>
          <p className="review-content">{summaryText}</p>
          <h4 className="judgement-title">왜 이렇게 판단했나요? 🤔</h4>
          <p className="judgement-reason">{evidence}</p>
          <p className="fake-report">▶ 가짜 리뷰로 제보하기</p>
          <p className="go-back">← 뒤로가기</p>
        </div>
        <div className="right-content">
          <h3>이 리뷰의 점수는?</h3>
          <img src={characterImage} alt="점수 캐릭터" className="score-image" />
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

export default ResultPage;
