import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./ResultPage.css";
import greenLion from "../../assets/result/green-choonsik.png";
import yellowLion from "../../assets/result/yellow-choonsik.png";
import redLion from "../../assets/result/red-choonsik.png";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    // 데이터가 없으면 홈으로 리다이렉트
    console.warn("No data received. Redirecting to home...");
    navigate("/", { replace: true });
    return null;
  }

  const { blogUrl, summaryTitle, summaryText, score, evidence } = data;

  const darkenColor = (color) => {
    const num = parseInt(color.slice(1), 16);
    const r = (num >> 16) - 30;
    const g = ((num >> 8) & 0x00ff) - 30;
    const b = (num & 0x0000ff) - 30;
    return `#${(r < 0 ? 0 : r).toString(16)}${(g < 0 ? 0 : g).toString(16)}${(b < 0 ? 0 : b).toString(16)}`;
  };

  const getScoreStyle = (score) => {
    if (score >= 70) {
      return {
        scoreClass: "score-high",
        characterImage: greenLion,
        circleBorderColor: "#4CAF50", // Green
      };
    } else if (score >= 40) {
      return {
        scoreClass: "score-medium",
        characterImage: yellowLion,
        circleBorderColor: "#FFA000", // Orange
      };
    } else {
      return {
        scoreClass: "score-low",
        characterImage: redLion,
        circleBorderColor: "#FF5252", // Red
      };
    }
  };

  const { scoreClass, characterImage, circleBorderColor } = getScoreStyle(score);

  return (
    <div className="outer-container">
      <div className="result-container" style={{ maxWidth: "60%" }}>
        <div className="url-section">
          <h4 className="url-title">입력하신 URL</h4>
          <h2 className="blog-url">[ {blogUrl} ]</h2>
          <h4 className="url-title">에 작성된 리뷰 검사 결과입니다.</h4>
          <div className="divider" />
        </div>

        <div className={`main-content ${scoreClass}`} style={{ borderColor: circleBorderColor }}>
          <div className="left-content" style={{ flex: "0 0 60%" }}>
            <div>
              <h3 className="section-title">AI 리뷰 요약 🤖</h3>
              <h4 className="summary-title">{summaryTitle}</h4>
              <p className="summary-text">{summaryText}</p>
            </div>

            <div>
              <h3 className="section-title">왜 이렇게 판단했나요? 🧐</h3>
              <p className="evidence-text">{evidence}</p>
            </div>

            <button className="report-button" style={{ color: circleBorderColor }}>
              ▶ 가짜 리뷰로 제보하기
            </button>
          </div>

          <div className="right-content">
            <h3 className="section-title mb-4">이 리뷰의 점수는?</h3>
            <br></br>

            <div className="score-visual">
              <img
                src={characterImage}
                alt="Score Character"
                className="score-character"
              />
              <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: "150px", height: "150px" }}>
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${score}, 100`}
                  style={{ stroke: circleBorderColor }}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{score}</text>
              </svg>
            </div>
            <br></br>
            <button
              className="criteria-button mt-4 mb-6"
              style={{ color: circleBorderColor }}
              onMouseEnter={(e) => (e.target.style.color = darkenColor(circleBorderColor))}
              onMouseLeave={(e) => (e.target.style.color = circleBorderColor)}
            >
              ▶ 검사 기준이 궁금하신가요?
            </button>

            <div className="feedback-buttons">
              <button className="feedback-button">
                <ThumbsUp size={24} />
              </button>
              <button className="feedback-button">
                <ThumbsDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
