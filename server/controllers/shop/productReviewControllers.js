import Review from '../../models/Review.js';
import Product from '../../models/Product.js';
import Order from '../../models/Order.js';

const addProductReview = async (req, res) => {
  try {
    const { reviewRequirements } = req.body;
    const productOrder = await Order.findOne({
      userId: reviewRequirements.userId,
      'cartItems.productId': reviewRequirements.productId,
      orderStatus: 'confirmed',
    });
    if (!productOrder) {
      return res.status(403).json({
        success: false,
        msg: 'Purchase the product first and wait for its deliver',
      });
    }
    const existingReview = await Review.findOne({
      userId: reviewRequirements.userId,
      productId: reviewRequirements.productId,
    });
    if (existingReview) {
      return res.status(403).json({
        success: false,
        msg: 'You already have a review on this product',
      });
    }
    const newReview = new Review({
      productId: reviewRequirements.productId,
      userId: reviewRequirements.userId,
      userName: reviewRequirements.userName,
      message: reviewRequirements.message,
      rating: reviewRequirements.rating,
    });
    await newReview.save();

    const allProductReviews = await Review.find({
      productId: reviewRequirements.productId,
    });
    const totalRating = allProductReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const avgRating =
      allProductReviews.length > 0
        ? (totalRating / allProductReviews.length).toFixed(1)
        : 0;
    const updatedProduct = await Product.findByIdAndUpdate(
      reviewRequirements.productId,
      {
        avgRating: parseFloat(avgRating),
        reviewsCount: allProductReviews.length, // Increments review count
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        newReview,
        updatedProduct,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
const getAllProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    return res.status(201).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

export { addProductReview, getAllProductReviews };
