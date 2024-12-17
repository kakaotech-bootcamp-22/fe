import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import "./ResultPage.css";
import greenLion from "../../assets/result/green-choonsik.png";
import yellowLion from "../../assets/result/yellow-choonsik.png";
import redLion from "../../assets/result/red-choonsik.png";

const { TextArea } = Input;

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [ feedbackModalVisible, setFeedbackModalVisible ] = useState(false);
  const [ feedbackReason, setFeedbackReason ] = useState("");
  const [ feedbackType, setFeedbackType ] = useState("");

  if (!data) {
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
        lionContainerStyle: {
          top: "-80px",
          width: "160px",
          height: "160px",
        },
      };
    } else if (score >= 40) {
      return {
        scoreClass: "score-medium",
        characterImage: yellowLion,
        circleBorderColor: "#FFA000", // Orange
        lionContainerStyle: {
          top: "-40px",
          width: "80px",
          height: "80px",
        },
      };
    } else {
      return {
        scoreClass: "score-low",
        characterImage: redLion,
        circleBorderColor: "#FF5252", // Red
        lionContainerStyle: {
          top: "-90px",
          width: "150px",
          height: "150px",
        },
      };
    }
  };

  const { scoreClass, characterImage, circleBorderColor, lionContainerStyle } = getScoreStyle(score);

  // 피드백 모달 열기
  const showFeedbackModal = (type) => {
    setFeedbackType(type);
    setFeedbackModalVisible(true);
  };

  // 피드백 모달 닫기
  const handleFeedbackCancel = () => {
    setFeedbackReason("");
    setFeedbackModalVisible(false);
  };

  // 피드백 제출
  const handleFeedbackSubmit = async () => {
    console.log("Feedback Type:", feedbackType);
    console.log("Feedback Reason:", feedbackReason);

    if (!feedbackReason.trim()) {
      message.error("사유를 입력해주세요!");
      return;
    }

    try {
      // 백엔드에 전송할 데이터 구성
      const payload = {
        feedbackType, // 'like' 또는 'dislike'
        feedbackReason, // 사용자가 입력한 사유
      };
  
      // POST 요청 전송
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/feedback`,
        payload
      );
  
      console.log("Feedback submitted successfully:", response.data);
      message.success("피드백이 성공적으로 제출되었습니다!");
  
      // 모달 닫기 및 상태 초기화
      setFeedbackModalVisible(false);
      setFeedbackReason("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      message.error("피드백 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="outer-container">
      <div className="result-container" style={{ maxWidth: "60%" }}>
        <div className="url-section">
          <br></br>
          <h4 className="url-title">입력하신 URL</h4>
          <h2 className="blog-url">[ {blogUrl} ]</h2>
          <h4 className="url-title">에 작성된 리뷰 검사 결과입니다.</h4>
          <div className="divider" />
        </div>

        <div className={`main-content ${scoreClass}`} style={{ borderColor: circleBorderColor }}>
          <div className="left-content" style={{ flex: "0 0 60%" }}>
            <div>
              <h3 className="section-title" style={{ fontWeight: "bold" }}>AI 리뷰 요약 🤖</h3>
              <h4 className="summary-title">{summaryTitle}</h4>
              <p className="summary-text">{summaryText}</p>
            </div>

            <div>
              <h3 className="section-title" style={{ fontWeight: "bold" }}>왜 이렇게 판단했나요? 🧐</h3>
              <p className="evidence-text">{evidence}</p>
            </div>

            {/* <button className="report-button" style={{ color: circleBorderColor }}>
              ▶ 가짜 리뷰로 제보하기
            </button> */}
          </div>

          <div className="right-content">
            <h3 className="section-title mb-4" style={{ fontWeight: "bold" }}>이 리뷰의 점수는?</h3>

            <div className="score-visual">
              <div className="circle-container" style={{ position: "relative" }}>
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
                  <text x="18" y="22.1" className="percentage">{score}</text>
                </svg>
                <div className="lion-container" style={{ top: lionContainerStyle.top }}>
                  <img
                    src={characterImage}
                    alt="Score Character"
                    className="score-character"
                    style={{
                      width: lionContainerStyle.width,
                      height: lionContainerStyle.height,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              className="criteria-button mt-4 mb-6"
              style={{ color: circleBorderColor }}
              onMouseEnter={(e) => (e.target.style.color = darkenColor(circleBorderColor))}
              onMouseLeave={(e) => (e.target.style.color = circleBorderColor)}
            >
              ▶ 검사 기준이 궁금하신가요?
            </button>

            <div className="feedback-buttons">
              <button className="feedback-button" onClick={() => showFeedbackModal("like")}>
                <ThumbsUp size={24} />
              </button>
              <button className="feedback-button" onClick={() => showFeedbackModal("dislike")}>
                <ThumbsDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 피드백 모달 */}
      <Modal
        title="피드백 제출"
        visible={feedbackModalVisible}
        onCancel={handleFeedbackCancel}
        footer={[
          <Button key="cancel" onClick={handleFeedbackCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={handleFeedbackSubmit}>
            제출하기
          </Button>,
        ]}
      >
        <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
          {feedbackType === "like" ? "긍정 피드백" : "부정 피드백"}
        </p>
        <p>검사 결과에 대한 피드백을 입력해주세요.</p>
        <TextArea
          rows={4}
          value={feedbackReason}
          onChange={(e) => setFeedbackReason(e.target.value)}
          placeholder="피드백 사유를 입력해주세요"
        />
      </Modal>
    </div>
  );
};

export default ResultPage;
