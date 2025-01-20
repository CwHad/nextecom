export function calculateAverageRating(ratings) {
  //   let totalRating = 0;

  //   for (const ratingObj of ratings) {
  //     totalRating += ratingObj?.rating;
  //   }

  //   const averageRating = totalRating / ratings.length;
  //   return averageRating;

  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce((sum, { rating }) => sum + rating, 0);
  return totalRating / ratings.length;
}
