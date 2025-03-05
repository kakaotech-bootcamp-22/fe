import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./ResultPage.css";
import greenLion from "../../assets/result/green-choonsik.png";
import yellowLion from "../../assets/result/yellow-choonsik.png";
import redLion from "../../assets/result/red-choonsik.png";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
import Review from "../Review/Review";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, login, logout, nickname, profileImage, platform, createdAt, email, writtenReviewCount, receivedLikeCount, loading, settingLoading, loginFail, } = useAuth(); // 로그인 상태 및 사용자 정보 가져오기
  const [errorMessage, setErrorMessage] = useState("");
  const [resultData, setResultData] = useState(null);

  // 데이터를 임시 저장하는 함수
  const saveTemporaryData = (data) => {
    localStorage.setItem("temporaryResult", JSON.stringify(data));
  };

  // 임시 저장된 데이터를 가져오는 함수
  const getTemporaryData = () => {
    const savedData = localStorage.getItem("temporaryResult");
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    // 데이터를 location.state에서 가져옴
    const initialData = location.state;

    if (initialData) {
      setResultData(initialData);
      saveTemporaryData(initialData); // 데이터를 임시 저장
    } else {
      const tempData = getTemporaryData(); // 임시 저장된 데이터 복원
      if (tempData) {
        setResultData(tempData);
      } else {
        console.warn("No data available. Redirecting to home...");
        navigate("/", { replace: true });
      }
    }
  }, [location.state, navigate]);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const redirected = urlParams.get("redirected"); // 리다이렉션 여부 확인
    const redirectUri = `${API_URL}/result?redirected=true`;
    if (redirected && code) {
      // 받은 인가 코드를 백엔드로 전송하여 액세스 토큰 요청
      axios
        .post(`${API_URL}/auth/kakao/token`,
          {
            code,
            redirectUri,
          }, {
          headers: {
            "Content-Type": "application/json", // 요청 헤더 명시
          },

          withCredentials: true,
        }
        )
        .then((response) => {
          console.log(response.data)
          if (response.data.jwtToken) {
            login(
              response.data.jwtToken,
              response.data.nickname,
              response.data.profileImage,
              response.data.platform,
              response.data.createdAt,
              response.data.email
            );
          }
          settingLoading(false);
          // URL에서 "code" 파라미터 제거
          const url = new URL(window.location.href);
          url.searchParams.delete("code"); // "code" 파라미터 제거
          url.searchParams.delete("redirected");
          window.history.replaceState(null, "", url.toString());
        })
        .catch(error => {
          console.error("백엔드와 통신 중 에러 발생:", error);
          setErrorMessage("로그인에 실패했습니다.");

        });
    }
    else {
      if (isLoggedIn === false) {
        axios.get(`${API_URL}/auth/status`, { withCredentials: true })
          .then(response => {
            if (response.data.loggedIn) {
              let str = response.data.nickname;
              // 문자열에 \uad가 포함되어 있는지 검사
              if (str.includes("\u00ad")) {
                str = str.slice(1); // 인덱스 1부터 자르기
              }
              login(
                response.data.jwtToken,
                str,
                response.data.userImage,
                response.data.platform,
                response.data.createdAt,
                response.data.email
              );
            }
          })
          .catch((error) => {
            setErrorMessage("로그인 상태를 확인할 수 없습니다.");
            loginFail(false);
            settingLoading(false);
          })
          .finally(() => {
            settingLoading(false);
          })
      }
    }
  }, [API_URL, login, settingLoading]);

  if (!resultData) {
    return <div>Loading...</div>;
  }

  const { blogUrl, summaryTitle, summaryText, score, evidence } = resultData;

  const darkenColor = (color) => {
    const num = parseInt(color.slice(1), 16);
    const r = (num >> 16) - 30;
    const g = ((num >> 8) & 0x00ff) - 30;
    const b = (num & 0x0000ff) - 30;
    return `#${(r < 0 ? 0 : r).toString(16)}${(g < 0 ? 0 : g).toString(
      16
    )}${(b < 0 ? 0 : b).toString(16)}`;
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

        <div
          className={`main-content ${scoreClass}`}
          style={{ borderColor: circleBorderColor }}
        >
          <div className="left-content" style={{ flex: "0 0 60%" }}>
            <div>
              <h3 className="section-title" style={{ fontWeight: "bold" }}>
                AI 리뷰 요약 🤖
              </h3>
              <h4 className="summary-title">{summaryTitle}</h4>
              <p className="summary-text">{summaryText}</p>
            </div>

            <div>
              <h3 className="section-title" style={{ fontWeight: "bold" }}>
                왜 이렇게 판단했나요? 🧐
              </h3>
              <p className="evidence-text">{evidence}</p>
            </div>

            {/* <button className="report-button" style={{ color: circleBorderColor }}>
              ▶ 가짜 리뷰로 제보하기
            </button> */}
          </div>

          <div className="right-content">
            <h3 className="section-title mb-4" style={{ fontWeight: "bold" }}>
              이 리뷰의 점수는?
            </h3>

            <div className="score-visual">
              <div
                className="circle-container"
                style={{ position: "relative" }}
              >
                <svg
                  viewBox="0 0 36 36"
                  className="circular-chart"
                  style={{ width: "150px", height: "150px" }}
                >
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
                  <text x="18" y="22.1" className="percentage">
                    {score}
                  </text>
                </svg>
                <div
                  className="lion-container"
                  style={{ top: lionContainerStyle.top }}
                >
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
              onMouseEnter={(e) =>
                (e.target.style.color = darkenColor(circleBorderColor))
              }
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
      <Review url={blogBaseUrl} blogId={blogId} />
    </div>
  );
};

export default ResultPage;
