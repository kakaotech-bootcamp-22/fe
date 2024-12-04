import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home"; 
import Navbar from "./components/Navbar/Navbar";
import LoadingPage from "./pages/Loading/LoadingPage";
import ResultPage from "./pages/Result/Result";
import LoginPage from "./pages/login/LoginPage";
import MyPage from "./pages/mypage/MyPage";
import EditMyPage from "./pages/mypage/EditMyPage";
import { AuthProvider } from "./context/AuthContext";
import Review from "./pages/Review/Review";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [requestId, setRequestId] = useState(null); // 요청 ID 저장

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

          {/* 로딩 상태에 따른 페이지 전환 */}
          <Route
            path="/"
            element={
              isLoading ? (
                <LoadingPage requestId={requestId} /> // 로딩 페이지로 requestId 전달
              ) : resultData ? (
                <ResultPage data={resultData} />
              ) : (
                <Home
                  onCheckURL={(url) => {
                    setIsLoading(true); // 로딩 상태 활성화
                    setResultData(null); // 기존 결과 초기화
                    setRequestId(url); // Mock 처리 (실제는 로직 작성 필요)
                  }}
                />
              )
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
