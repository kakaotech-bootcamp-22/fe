// Review.js
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Review.css";
import heartImage from "../../assets/review/heart.png";
import ryanImage from "../../assets/review/ryan_image.png";
import defaultProfileImage from "../../assets/review/default_profile.png";
import previousBtn from "../../assets/review/previous_btn.png";
import axios from "axios";

// Heart 컴포넌트 추가
const Heart = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FF0000" : "none"}
    stroke="#FF0000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ cursor: "pointer" }}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
         2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 
         C13.09 3.81 14.76 3 16.5 3 
         19.58 3 22 5.42 22 8.5 
         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

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
        key={option.value}
        className={`sort-option ${
          selectedSort === option.value ? "active" : ""
        }`}
        onClick={() => setSelectedSort(option.value)}
      >
        {option.label}
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
const ReviewItem = React.memo(({ review, handleLikeClick, renderStars }) => {
  const toggleLike = () => {
    handleLikeClick(review.blogReviewId, review.liked);
  };

  return (
    <div className="review-item">
      <div className="review-stars">{renderStars(review.rating)}</div>
      <div className="review-content-wrapper">
        <span className="trust-label">{review.rating}점</span>
        <p className="review-content">{review.content}</p>
      </div>
      <button className="like-button" onClick={toggleLike}>
        <Heart filled={review.liked} />
        <span>{review.likes}</span>
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
  );
});

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
  ({ currentPage, totalPages, handlePageClick }) => {
    const windowSize = 5; // 한 번에 표시할 페이지 수
    const totalWindows = Math.ceil(totalPages / windowSize);
    const currentWindow = Math.floor((currentPage - 1) / windowSize);

    const startPage = currentWindow * windowSize + 1;
    const endPage = Math.min(startPage + windowSize - 1, totalPages);

    const handlePrevWindow = () => {
      if (currentWindow > 0) {
        const newPage = startPage - 1;
        handlePageClick(newPage);
      }
    };

    const handleNextWindow = () => {
      if (currentWindow < totalWindows - 1) {
        const newPage = endPage + 1;
        handlePageClick(newPage);
      }
    };

    return (
      <div className="pagination">
        {/* "<<" 버튼 */}
        {currentWindow > 0 && (
          <button className="page-button" onClick={handlePrevWindow}>
            {"<<"}
          </button>
        )}

        {/* 페이지 번호 버튼 */}
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`page-button ${
                currentPage === pageNumber ? "active" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* ">>" 버튼 */}
        {currentWindow < totalWindows - 1 && (
          <button className="page-button" onClick={handleNextWindow}>
            {">>"}
          </button>
        )}
      </div>
    );
  }
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
    <button className="back-button" onClick={() => navigate("/")}>
      <img src={previousBtn} alt="뒤로 가기" className="back-arrow-icon" />
    </button>
  );
};

// 메인 Review 컴포넌트
export default function Review() {
  const {
    isLoggedIn,
    login,
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
  const [selectedSort, setSelectedSort] = useState("likes");
  const [ratingStats, setRatingStats] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const blog_id = location.state?.blog_id ?? 1;
  const url = location.state?.url ?? "blog.naver.com/kakao_food_fighter";
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // 쿠키 기반 로그인 상태 확인
    axios
      .get(`${API_URL}/auth/status`, { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn) {
          // 로그인 상태 업데이트
          login(
            response.data.jwtToken,
            response.data.nickname,
            response.data.userImage,
            response.data.platform,
            response.data.createdAt,
            response.data.email
          );
        }
      })
      .catch((error) => {
        console.error("로그인 상태 확인 중 오류 발생:", error);
      });
  }, [API_URL, login]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/review/${blog_id}`);
        const data = response.data; // axios는 response 객체에서 data를 포함합니다.
        // console.log("data:", data.reviews);
        setRatingStats(data.ratingStats);
        setReviews(data.reviews.content);
        setTotalPages(data.reviews.totalPages);
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

  useEffect(() => {
    const fetchSortedReviews = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/review/${blog_id}/reviews`,
          {
            params: {
              page: currentPage - 1,
              size: 5, // 필요에 따라 조정 가능
              sortBy: selectedSort, // 정렬 조건 추가
            },
            withCredentials: true, // 쿠키 인증 포함 (필요 시)
          }
        );
        const data = response.data;
        setReviews(data.content);
        setTotalReviews(data.totalElements);
        setTotalPages(data.totalPages);
        // 별점 통계 업데이트가 필요한 경우 추가
      } catch (error) {
        console.error("Error fetching sorted reviews:", error);
      }
    };

    fetchSortedReviews();
  }, [selectedSort, currentPage, blog_id, API_URL]);

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

      // 성공적으로 리뷰가 등록된 경우
      if (response.status === 201) {
        const savedReview = {
          blogReviewId: response.data.blogReviewId,
          id: reviews.length + 1,
          rating: rating,
          date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
          content: reviewText,
          author: nickname,
          profileImage: profileImage,
          likes: 0,
        };

        // 상태 업데이트
        setReviews((prevReviews) => [...prevReviews, savedReview]);
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

        // 입력 필드 초기화
        setRating(0);
        setReviewText("");

        alert("리뷰가 성공적으로 등록되었습니다!");
      }
    } catch (error) {
      // 응답 상태에 따른 처리
      if (error.response) {
        switch (error.response.status) {
          case 409: // 이미 리뷰를 등록한 경우
            alert("이미 리뷰를 등록하셨습니다.");
            break;
          case 401: // JWT 검증 실패
            alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
            break;
          case 500:
            alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
            break;
          case 404: // 해당 블로그 ID가 없는 경우
            alert("해당 블로그를 찾을 수 없습니다.");
            break;
          default: // 기타 에러
            alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 네트워크 오류 또는 기타 예외 처리
        console.error("리뷰 등록 중 예기치 않은 오류 발생:", error);
        alert("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  }, [rating, reviewText, reviews, blog_id, API_URL, nickname, profileImage]);

  const handleLikeClick = useCallback(
    async (id, isLiked) => {
      try {
        await axios.patch(
          `${API_URL}/review/like`,
          { reviewId: id },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.blogReviewId === id
              ? {
                  ...review,
                  likes: isLiked ? review.likes - 1 : review.likes + 1,
                  liked: !isLiked, // liked 상태를 토글
                }
              : review
          )
        );
      } catch (error) {
        console.error("좋아요 업데이트 중 오류 발생:", error);
      }
    },
    [API_URL]
  );

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

  // 수정된 sortOptions과 sortBy 매핑
  const sortOptions = [
    { label: "베스트순", value: "likes" },
    { label: "최근 등록순", value: "recent" },
    { label: "평점 높은순", value: "rating-desc" },
    { label: "평점 낮은순", value: "rating-asc" },
  ];
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
        reviews={reviews}
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
