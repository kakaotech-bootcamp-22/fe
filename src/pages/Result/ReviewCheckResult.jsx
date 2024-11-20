import React, { useEffect, useState } from "react";
import Result from "ResultPage";

const ReviewCheckResult = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/result"); // 백엔드 API URL
        const result = await response.json();
        setData(result); // 받아온 데이터 설정
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>로딩 중...</div>; // 로딩 상태 표시
  if (error) return <div>{error}</div>; // 에러 메시지 표시

  return (
    <Result
      score={data.score} // 백엔드에서 받아온 점수
      url={data.url} // 백엔드에서 받아온 URL
      reviewTitle={data.reviewTitle} // 리뷰 제목
      reviewContent={data.reviewContent} // 리뷰 내용
      judgementReason={data.judgementReason} // 판독 근거
    />
  );
};

export default ReviewCheckResult;
