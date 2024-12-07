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
          <Route
            path="/result"
            element={
              resultData ? <ResultPage data={resultData} /> : <Home />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
