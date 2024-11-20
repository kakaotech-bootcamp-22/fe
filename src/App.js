import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
<<<<<<< HEAD
import Loading from "./pages/Loading/Loading";
import ResultPage from "./pages/Result/Result";
=======
<<<<<<< HEAD
import Loading from "./components/Loading/Loading";
import ResultPage from "./components/Result/Result";
=======
import LoadingPage from "./pages/Loading/LoadingPage";
import ResultPage from "./pages/Result/ResultPage";
>>>>>>> 9719ff2 (KAN-54 feat: 서버에서 응답을 받으면 결과 페이지로 라우팅 되도록 변경)
>>>>>>> fe93523 (KAN-59 feat: 서버에서 응답을 받으면 결과 페이지로 라우팅 되도록 변경)
import LoginPage from "./pages/login/LoginPage";
import MyPage from "./pages/mypage/MyPage";
import EditMyPage from "./pages/mypage/EditMyPage";
import { AuthProvider } from "./context/AuthContext";
import Review from "./pages/Review/Review";

function App() {
  const [requestId, setRequestId] = useState(null); // 요청 ID 저장
  const [resultData, setResultData] = useState(null); // 결과 데이터 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  // URL 검사 요청 함수
  const handleCheckURL = async (blogUrl) => {
    try {
      setIsLoading(true); // 로딩 시작
      setResultData(null); // 이전 결과 초기화

      // 백엔드 API에 URL 전송
      const response = await fetch("https://your-backend-api.com/start-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogUrl }), // 블로그 URL 전송
      });

      if (response.ok) {
        const data = await response.json();
        setRequestId(data.requestId); // 요청 ID 저장
      } else {
        throw new Error("요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("URL 검사 중 오류 발생:", error);
      alert("URL 검사 요청 중 문제가 발생했습니다.");
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* 로그인 및 회원가입 */}
          <Route path="/login-signup" element={<LoginPage />} />

          {/* 리뷰 */}
          <Route path="/review" element={<Review />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit-mypage" element={<EditMyPage />} />

          {/* 메인 페이지 */}
          <Route
            path="/"
            element={<Home onCheckURL={handleCheckURL} />}
          />

          {/* 로딩 페이지 */}
          <Route
            path="/loading"
            element={<LoadingPage requestId={requestId} />}
          />

          {/* 결과 페이지 */}
          <Route
            path="/result"
            element={<ResultPage data={resultData} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
