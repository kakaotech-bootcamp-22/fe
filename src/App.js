import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home"; 
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import ResultPage from "./components/Result/Result";
import LoginPage from "./pages/login/LoginPage";
import { AuthProvider } from "./context/AuthContext";

import Review from "./components/Review/Review";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  // URL 검사 함수 (임시 로딩 상태 추가)
  const handleCheckURL = (url) => {
    setIsLoading(true); // 로딩 페이지로 전환
    setResultData(null); // 기존 결과 초기화

    // 2초 후에 로딩 종료 및 결과 페이지로 이동 (백엔드 없이 임시 테스트)
    setTimeout(() => {
      setIsLoading(false);
      setResultData({
        url,
        reviewScore: 85,
        summaryTitle: "검사 결과",
        summaryContent: "이 리뷰는 신뢰할 수 있습니다.",
      });
    }, 2000);
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
          {/* 로딩 상태에 따른 페이지 전환 */}
          <Route
            path="/"
            element={
              isLoading ? (
                <Loading />
              ) : resultData ? (
                <ResultPage data={resultData} />
              ) : (
                <Home onCheckURL={handleCheckURL} />
              )
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
