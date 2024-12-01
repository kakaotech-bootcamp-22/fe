// Review.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Review.css";
import heartImage from "../../assets/review/heart.png";
import ryanImage from "../../assets/review/ryan_image.png";
import defaultProfileImage from "../../assets/review/default_profile.png";
import previousBtn from "../../assets/review/previous_btn.png";
import axios from "axios";

// Star 컴포넌트
const Star = React.memo(({ filled, onClick }) => {
  const id = React.useId();

  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="none"
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
          {filled > 0 && (
            <>
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset={`${filled * 100}%`} stopColor="#4CAF50" />
            </>
          )}
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
});

// Progress 컴포넌트
const Progress = React.memo(({ value }) => (
  <div className="progress">
    <div className="progress-bar" style={{ width: `${value}%` }} />
  </div>
));

// ReviewHeader 컴포넌트
const ReviewHeader = ({ url }) => (
  <div className="review-header">
    <span className="link-text">{url}</span>에 대한 다른 유저들의 리뷰
  </div>
);

// AverageRating 컴포넌트
const AverageRating = React.memo(({ averageRating, renderStars }) => (
  <div className="average-rating">
    <div className="stars-container">
      {renderStars(averageRating)}
      <span className="average-score">{averageRating}</span>
      <span className="total-score">/5</span>
    </div>
  </div>
));

// RatingDistribution 컴포넌트
const RatingDistribution = React.memo(({ ratingStats, totalReviews }) => (
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
));

// ReviewSummary 컴포넌트
const ReviewSummary = () => (
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
);

// RatingOverview 컴포넌트
const RatingOverview = ({
  averageRating,
  renderStars,
  ratingStats,
  totalReviews,
}) => (
  <div className="rating-overview">
    <AverageRating averageRating={averageRating} renderStars={renderStars} />
    <RatingDistribution ratingStats={ratingStats} totalReviews={totalReviews} />
    <ReviewSummary />
  </div>
);

// SortOptions 컴포넌트
const SortOptions = ({ sortOptions, selectedSort, setSelectedSort }) => (
  <div className="sort-options">
    {sortOptions.map((option) => (
      <button
        key={option}
        className={`sort-option ${selectedSort === option ? "active" : ""}`}
        onClick={() => setSelectedSort(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

// SortContainer 컴포넌트
const SortContainer = ({
  totalReviews,
  sortOptions,
  selectedSort,
  setSelectedSort,
}) => (
  <div className="sort-container">
    <span className="review-count">유저리뷰 ({totalReviews})</span>
    <SortOptions
      sortOptions={sortOptions}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
  </div>
);

// ReviewItem 컴포넌트
const ReviewItem = React.memo(({ review, handleLikeClick, renderStars }) => (
  <div className="review-item">
    <div className="review-stars">{renderStars(review.rating)}</div>
    <div className="review-content-wrapper">
      <span className="trust-label">{review.rating}점</span>
      <p className="review-content">{review.content}</p>
    </div>
    <button className="like-button" onClick={() => handleLikeClick(review.id)}>
      <img src={heartImage} alt="Heart" className="heart-icon" /> {review.likes}
    </button>
    <div className="review-info">
      <div className="review-author">
        <img
          src={review.profileImage || defaultProfileImage}
          alt={`${review.author} Profile`}
          className="avatar-img"
        />
        <span className="author-name">{review.author}</span>
      </div>
      <span className="review-date">{review.date}</span>
    </div>
  </div>
));

// ReviewList 컴포넌트
const ReviewList = ({
  reviews,
  handleLikeClick,
  renderStars,
  currentPage,
  totalPages,
  handlePageClick,
}) => (
  <div className="review-list">
    {reviews.map((review) => (
      <ReviewItem
        key={review.id}
        review={review}
        handleLikeClick={handleLikeClick}
        renderStars={renderStars}
      />
    ))}

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageClick={handlePageClick}
    />
  </div>
);

// Pagination 컴포넌트
const Pagination = React.memo(
  ({ currentPage, totalPages, handlePageClick }) => (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
        >
          {index + 1}
        </button>
      ))}
      <button className="page-button">{" >> "}</button>
    </div>
  )
);

// ReviewForm 컴포넌트
const ReviewForm = ({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  reviewText,
  setReviewText,
  handleSubmitReview,
}) => (
  <div className="review-form">
    <h2>이 블로그의 후기 등록하기</h2>
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
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
      onChange={(e) => {
        const inputText = e.target.value;
        if (inputText.length <= 200) {
          setReviewText(inputText);
        }
      }}
      className="review-textarea"
    />
    <div className="form-footer">
      <div className="character-count">{reviewText.length}/200</div>
      <button className="submit-button" onClick={handleSubmitReview}>
        등록
      </button>
    </div>
  </div>
);

// BackButton 컴포넌트
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <img src={previousBtn} alt="뒤로 가기" className="back-arrow-icon" />
    </button>
  );
};

// 메인 Review 컴포넌트
export default function Review() {
  const {
    isLoggedIn,
    logout,
    nickname,
    profileImage,
    platform,
    createdAt,
    email,
  } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedSort, setSelectedSort] = useState("베스트순");
  const [ratingStats, setRatingStats] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const blog_id = location.state?.blog_id ?? 1;
  const url = location.state?.url ?? "blog.naver.com/kakao_food_fighter";
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/review/${blog_id}`);
        const data = response.data; // axios는 response 객체에서 data를 포함합니다.
        console.log("data:", data.reviews);
        setRatingStats(data.ratingStats);
        setReviews(data.reviews);

        const total = Object.values(data.ratingStats).reduce(
          (sum, count) => sum + count,
          0
        );
        setTotalReviews(total);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };
    fetchReviews();
  }, []);

  // useEffect(() => {
  //   console.log("isLoggedIn: ", isLoggedIn);
  //   console.log("nickname: ", nickname);
  //   console.log("profileImage: ", profileImage);
  //   console.log("platform: ", platform);
  //   console.log("createdAt: ", createdAt);
  //   console.log("email: ", email);
  // }, []);

  // 평균 점수 계산
  const calculateAverageRating = useCallback(() => {
    const totalRatingPoints = Object.entries(ratingStats).reduce(
      (sum, [score, count]) => sum + score * count,
      0
    );
    return totalReviews ? (totalRatingPoints / totalReviews).toFixed(1) : "0.0";
  }, [ratingStats, totalReviews]);

  const averageRating = calculateAverageRating();

  const handleSubmitReview = useCallback(async () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("평점과 리뷰 내용을 입력해주세요.");
      return;
    }

    const newReview = {
      rating: rating,
      content: reviewText,
      blogId: blog_id, // 현재 페이지의 blog_id
    };

    try {
      const response = await axios.post(`${API_URL}/review`, newReview, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // 쿠키를 포함
      });

      const savedReview = {
        id: reviews.length + 1,
        rating: rating,
        date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
        content: reviewText,
        author: nickname,
        profileImage: profileImage,
        likes: 0,
      };

      // 상태 업데이트
      setReviews((prevReviews) => [savedReview, ...prevReviews]);
      setTotalReviews((prevTotal) => prevTotal + 1);

      // 별점 통계 업데이트
      setRatingStats((prevStats) => {
        const newStats = { ...prevStats };
        const roundedRating = Math.round(savedReview.rating);
        if (newStats[roundedRating]) {
          newStats[roundedRating] += 1;
        } else {
          newStats[roundedRating] = 1;
        }
        return newStats;
      });

      alert("리뷰가 등록되었습니다!");
    } catch (error) {
      console.error("리뷰 등록 중 오류 발생:", error);
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    }
  }, [rating, reviewText, reviews, blog_id, API_URL]);

  // 리뷰 좋아요 클릭 핸들러
  const handleLikeClick = useCallback((id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  }, []);

  // 페이지 클릭 핸들러
  const handlePageClick = useCallback((page) => {
    setCurrentPage(page);
    // 페이지 변경 시 리뷰를 다시 불러오는 로직 추가 가능
  }, []);

  // 별점 렌더링 함수
  const renderStars = useCallback((rating) => {
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
  }, []);

  // 정렬된 리뷰 리스트 생성 (베스트순, 최근 등록순, 평점 높은순, 평점 낮은순)
  const sortedReviews = React.useMemo(() => {
    let sorted = [...reviews];
    switch (selectedSort) {
      case "베스트순":
        sorted.sort((a, b) => b.likes - a.likes);
        break;
      case "최근 등록순":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "평점 높은순":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "평점 낮은순":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    return sorted;
  }, [reviews, selectedSort]);

  const sortOptions = ["베스트순", "최근 등록순", "평점 높은순", "평점 낮은순"];
  const totalPages = 5;

  return (
    <div className="review-system">
      <ReviewHeader url={url} />

      <RatingOverview
        averageRating={averageRating}
        renderStars={renderStars}
        ratingStats={ratingStats}
        totalReviews={totalReviews}
      />

      <hr className="hr" />

      <SortContainer
        totalReviews={totalReviews}
        sortOptions={sortOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <ReviewList
        reviews={sortedReviews}
        handleLikeClick={handleLikeClick}
        renderStars={renderStars}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageClick={handlePageClick}
      />

      <ReviewForm
        rating={rating}
        setRating={setRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        reviewText={reviewText}
        setReviewText={setReviewText}
        handleSubmitReview={handleSubmitReview}
      />

      <BackButton />
    </div>
  );
}
