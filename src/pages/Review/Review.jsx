// Review.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Review.css";
import heartImage from "../../assets/review/heart.png";
import ryanImage from "../../assets/review/ryan_image.png";
import defaultProfileImage from "../../assets/review/default_profile.png";
import previousBtn from "../../assets/review/previous_btn.png";

export default function Review() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedSort, setSelectedSort] = useState("베스트순");
  const [url, setUrl] = useState("blog.naver.com/kakao_food_fighter");
  const [ratingStats, setRatingStats] = useState({
    1: 1,
    2: 30,
    3: 15,
    4: 30,
    5: 25,
  });
  const [totalReviews, setTotalReviews] = useState(100);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      date: "2024.03.19",
      content:
        "이 블로거 본 내돈내산으로 찐 리뷰만 남겨 주셔서 좋아요. 전 구독 했음.",
      author: "농구하는 너구리",
      profileImage: "",
      likes: 5,
    },
    {
      id: 2,
      rating: 4.5,
      date: "2024.03.19",
      content:
        "이 블로거 본 내돈내산으로 찐 리뷰만 남겨 주셔서 좋아요. 전 구독 했음.",
      author: "농구하는 너구리",
      profileImage: "",
      likes: 3,
    },
    // 추가 리뷰들...
  ]);

  const navigate = useNavigate();

  // 평균 점수 계산
  const calculateAverageRating = () => {
    const totalRatingPoints = Object.entries(ratingStats).reduce(
      (sum, [score, count]) => sum + score * count,
      0
    );
    return totalReviews ? (totalRatingPoints / totalReviews).toFixed(1) : "0.0";
  };

  const averageRating = calculateAverageRating();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch("/api/url");
        const data = await response.json();
        setUrl(data.url);
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    };

    fetchUrl();
  }, []);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= 200) {
      setReviewText(inputText);
    }
  };

  const handleLikeClick = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // 페이지 변경 시 리뷰를 다시 불러오는 로직 추가 가능
  };

  const sortOptions = ["베스트순", "최근 등록순", "평점 높은순", "평점 낮은순"];
  const totalPages = 5;

  // 별점 렌더링 함수
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} filled={1} />);
      } else if (rating >= i - 0.5) {
        stars.push(<Star key={i} filled={0.5} />);
      } else {
        stars.push(<Star key={i} filled={0} />);
      }
    }
    return stars;
  };

  // 별점 클릭 핸들러
  const handleRatingClick = (value) => {
    setRating(value);
  };

  // 리뷰 제출 핸들러
  const handleSubmitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("평점과 리뷰 내용을 입력해주세요.");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      rating: rating,
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      content: reviewText,
      author: "익명", // 실제 사용자 정보로 대체 필요
      profileImage: "",
      likes: 0,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
    setTotalReviews(totalReviews + 1);

    // ratingStats 업데이트 로직 추가
    setRatingStats((prevStats) => {
      const newStats = { ...prevStats };
      const roundedRating = Math.round(rating);
      if (newStats[roundedRating]) {
        newStats[roundedRating] += 1;
      } else {
        newStats[roundedRating] = 1;
      }
      return newStats;
    });
  };

  return (
    <div className="review-system">
      <div className="review-header">
        <span className="link-text">{url}</span>에 대한 다른 유저들의 리뷰
      </div>

      <div className="rating-overview">
        <div className="average-rating">
          <div className="stars-container">
            {renderStars(averageRating)}
            <span className="average-score">{averageRating}</span>
            <span className="total-score">/5</span>
          </div>
        </div>
        <div className="rating-distribution">
          <p className="star-rating">별점</p>
          {Object.entries(ratingStats)
            .sort(([a], [b]) => b - a)
            .map(([rating, count]) => {
              const percentage = totalReviews
                ? Math.round((count / totalReviews) * 100)
                : 0;
              return (
                <div key={rating} className="rating-row">
                  <span className="rating-label">{rating}점</span>
                  <Progress value={percentage} />
                  <span className="rating-percentage">{percentage}%</span>
                </div>
              );
            })}
        </div>
        <div className="review-summary">
          <div className="character-avatar">
            <img src={ryanImage} alt="Ryan Avatar" className="review-img" />
          </div>
          <div className="review-text">
            <span>대부분</span>
            <span className="highlight"> 찐 리뷰를 남겼다</span>
            <span>고 남겨줬어요</span>
          </div>
        </div>
      </div>

      <hr className="hr" />
      <div className="sort-container">
        <span className="review-count">유저리뷰 ({totalReviews})</span>
        <div className="sort-options">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`sort-option ${
                selectedSort === option ? "active" : ""
              }`}
              onClick={() => setSelectedSort(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-stars">{renderStars(review.rating)}</div>
            <div className="review-content-wrapper">
              <span className="trust-label">{review.rating}점</span>
              <p className="review-content">{review.content}</p>
            </div>
            <button
              className="like-button"
              onClick={() => handleLikeClick(review.id)}
            >
              <img src={heartImage} alt="Heart" className="heart-icon" />{" "}
              {review.likes}
            </button>
            <div className="review-info">
              <div className="review-author">
                <img
                  src={review.profileImage || defaultProfileImage}
                  alt={`${review.author} Profile`}
                  className="avatar-img"
                />
                <span>{review.author}</span>
              </div>
              <span className="review-date">{review.date}</span>
            </div>
          </div>
        ))}

        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button className="page-button">{" >> "}</button>
        </div>
      </div>

      <div className="review-form">
        <h2>이 블로그의 후기 등록하기</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="star-button"
            >
              <Star filled={star <= (hoverRating || rating) ? 1 : 0} />
            </button>
          ))}
          <span className="rating-score">({rating}/5)</span>
        </div>
        <textarea
          placeholder="해당 페이지에 대한 리뷰를 등록해주세요."
          value={reviewText}
          onChange={handleTextChange}
          className="review-textarea"
        />
        <div className="form-footer">
          <div className="character-count">{reviewText.length}/200</div>
          <button className="submit-button" onClick={handleSubmitReview}>
            등록
          </button>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={previousBtn} alt="뒤로 가기" className="back-arrow-icon" />
      </button>
    </div>
  );
}

// Star 컴포넌트
const Star = ({ filled, onClick }) => {
  const id = React.useId();

  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="none" // Stroke will be handled by gradient
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <defs>
        {/* Gradient for Fill */}
        <linearGradient
          id={`fill-grad-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#4CAF50" />
          <stop
            offset={`${filled * 100}%`}
            stopColor={filled === 0 ? "#e2e8f0" : "#4CAF50"}
          />
          <stop offset={`${filled * 100}%`} stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>

        {/* Gradient for Stroke */}
        <linearGradient
          id={`stroke-grad-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset={`${filled * 100}%`} stopColor="#4CAF50" />
          <stop offset={`${filled * 100}%`} stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#fill-grad-${id})`}
        stroke={`url(#stroke-grad-${id})`}
        points="12 2 15.09 8.26 22 9.27 17 14.14 
                18.18 21.02 12 17.77 5.82 21.02 
                7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
  );
};

// Progress 컴포넌트
const Progress = ({ value }) => (
  <div className="progress">
    <div className="progress-bar" style={{ width: `${value}%` }} />
  </div>
);
