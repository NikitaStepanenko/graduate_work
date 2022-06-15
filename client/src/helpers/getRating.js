export const getRating = (product) => {
  let value = 0;

  product.ratings.forEach((rating) => (value += rating.rate));
  return value / product.ratings.length;
};
