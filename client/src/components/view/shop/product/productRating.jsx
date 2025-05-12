import { useState } from 'react';
import { StarHalf, StarIcon } from 'lucide-react';

export default function ProductRating({
  rating = 0,
  isReview = false,
  onRate = () => {},
}) {
  const [userRating, setUserRating] = useState(0); // To hold user’s rating if they are reviewing
  const filledStars =
    rating % 1 > 0.75 ? Math.ceil(rating) : Math.floor(rating); // The whole number part of the average rating
  const hasHalfStar = !isReview && rating % 1 >= 0.35 && rating % 1 <= 0.75; // If there's a half star

  const handleStarClick = (starIndex) => {
    if (isReview) {
      // Set the user's rating based on the clicked star
      setUserRating(starIndex);
      onRate(starIndex); // Pass the rating value to the parent component
    }
  };

  const renderStars = () => {
    const stars = [];

    // Render filled stars
    for (let i = 1; i <= 5; i++) {
      const isFull = i <= (isReview ? userRating : filledStars); // Decide if the star is full
      const isHalf = i === filledStars + 1 && hasHalfStar; // Handle half-star condition
      const isEmpty = i > filledStars + (hasHalfStar ? 1 : 0); // Handle empty stars

      if (isFull) {
        stars.push(
          <span
            key={i}
            className={`${isReview ? 'cursor-pointer hover:bg-gray-300' : ''}`}
            onClick={() => isReview && handleStarClick(i)}
          >
            <StarIcon className="w-3 h-3 fill-black" />
          </span>
        );
      } else if (isHalf) {
        stars.push(
          <span
            key={i}
            className={`${
              isReview ? 'cursor-pointer hover:bg-gray-300' : ''
            } flex`}
            onClick={() => isReview && handleStarClick(i)}
          >
            <StarHalf className="w-3 h-3 fill-black mr-[-12px]" />
            <StarHalf className="w-3 h-3  scale-x-[-1]" />
          </span>
        );
      } else if (isEmpty) {
        stars.push(
          <span
            key={i}
            className={`${isReview ? 'cursor-pointer hover:bg-gray-300' : ''}`}
            onClick={() => isReview && handleStarClick(i)}
          >
            <StarIcon className="w-3 h-3 fill-white" />
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-0.5">
      {/* Render stars differently based on whether it's a review or just viewing the rating */}
      {renderStars()}
    </div>
  );
}
