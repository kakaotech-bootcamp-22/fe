import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate 가져오기

import "./Review.css";
import heartImage from "../../assets/review/heart.png";
import ryanImage from "../../assets/review/ryan_image.png";
import defaultProfileImage from "../../assets/review/default_profile.png";
import previousBtn from "../../assets/review/previous_btn.png";

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#4CAF50" : "none"}
    stroke={filled ? "#4CAF50" : "#e2e8f0"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Progress = ({ value }) => (
  <div className="progress">
    <div className="progress-bar" style={{ width: `${value}%` }} />
  </div>
);

export default function Review() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedSort, setSelectedSort] = useState("베스트순");
  const [url, setUrl] = useState("blog.naver.com/kakao_food_fighter");
  const navigate = useNavigate(); // 뒤로 가기 기능을 위한 useNavigate 훅 사용

  // 백엔드에서 URL 가져오기
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

  const reviews = [
    {
      id: 1,
      rating: 5,
      date: "2024.03.19",
      content:
        "이 블로거 본 내돈내산으로 찐 리뷰만 남겨 주셔서 좋아요. 전 구독 했음.",
      author: "농구하는 너구리",
      profileImage: "", // 프로필 이미지 URL 추가
    },
    {
      id: 2,
      rating: 5,
      date: "2024.03.19",
      content:
        "이 블로거 본 내돈내산으로 찐 리뷰만 남겨 주셔서 좋아요. 전 구독 했음.",
      author: "농구하는 너구리",
      profileImage: "", // 프로필 이미지 URL 추가
    },
  ];

  const ratingStats = {
    5: 0,
    4: 90,
    3: 0,
    2: 0,
    1: 0,
  };

  const sortOptions = ["베스트순", "최근 등록순", "평점 높은순", "평점 낮은순"];
  const totalPages = 5;

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => <Star key={index} filled={index < rating} />);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="review-system">
      <div className="review-header">
        <span className="link-text">{url}</span>에 대한 다른 유저들의 리뷰
      </div>

      <div className="rating-overview">
        <div className="average-rating">
          <div className="stars-container">
            {renderStars(3.5)}
            <span className="average-score">3.5</span>
            <span className="total-score">/5</span>
          </div>
        </div>
        <div className="rating-distribution">
          <p className="star-rating">별점</p>
          {Object.entries(ratingStats)
            .reverse()
            .map(([rating, percentage]) => (
              <div key={rating} className="rating-row">
                <span className="rating-label">{rating}점</span>
                <Progress value={percentage} />
                <span className="rating-percentage">{percentage}%</span>
              </div>
            ))}
        </div>
        <div className="review-summary">
          <div className="character-avatar">
            <img src={ryanImage} alt="Default Avatar" className="review-img" />
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
        <span className="review-count">유저리뷰 ({reviews.length})</span>
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
              <span className="trust-label">{review.rating}점</span>{" "}
              {/* 별점만 표시 */}
              <p className="review-content">{review.content}</p>
            </div>
            <button className="like-button">
              <img src={heartImage} alt="Heart" className="heart-icon" /> 5
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
              onClick={() => setRating(star)}
              className="star-button"
            >
              <Star filled={star <= rating} />
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
          <button className="submit-button">등록</button>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={previousBtn} alt="뒤로 가기" className="back-arrow-icon" />
      </button>
    </div>
  );
}
