import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home"; 
import Navbar from "./components/Navbar/Navbar";
import LoadingPage from "./pages/Loading/LoadingPage";
import ResultPage from "./pages/Result/ResultPage";
import LoginPage from "./pages/login/LoginPage";
import MyPage from "./pages/mypage/MyPage";
import EditMyPage from "./pages/mypage/EditMyPage";
import { AuthProvider } from "./context/AuthContext";
import Review from "./pages/Review/Review";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login-signup" element={<LoginPage />} />
          <Route path="/review" element={<Review />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit-mypage" element={<EditMyPage />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<ResultPage /> } />
          {/* Mock Data 경로 */}
          <Route
            path="/mock-result"
            element={
              <ResultPage
                data={{
                  blogUrl: "https://blog.naver.com/kakao_food_fighter/1038913",
                  summaryTitle: "판교역 돈까스 맛집 추천, 직장인들 점심 해결!",
                  summaryText: "판교역 근처 돈까스 가게 다녀왔어요. 고기는 부드럽고 튀김은 바삭, 소스가 진짜 맛있었어요! 가게도 깔끔해서 직장인들 점심으로 딱이더라구요. 맛있는 돈까스 찾는 분들께 강추!",
                  score: 60,
                  evidence: "가짜 리뷰를 의심할 만한 근거가 발견되지 않았습니다.",
                }}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
