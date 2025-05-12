import ProductPrice from '@/components/view/shop/product/productPrice';
import ProductRating from '@/components/view/shop/product/productRating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  fetchProductDetails,
  setProductsDetails,
} from '@/store/shop/productsSlice';
import { ArrowUpFromLine, Quote } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { toastStyles } from '@/utils/toastStyles';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import {
  addProductReview,
  getAllProductReviews,
} from '@/store/shop/reviewSlice';

export default function ProductDetails({
  isOpen,
  setIsOpen,
  product,
  handleAddToCart,
  productsIdInCart,
}) {
  const { productDetails } = useSelector((state) => state.shopProducts);
  const {
    image: productImage,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    salePrice: productSalePrice,
    avgRating: productAvgRating,
    reviewsCount: productReviewsCount,
  } = productDetails;
  const { reviewsList } = useSelector((state) => state.productReview) || [];
  const { user } = useSelector((state) => state.auth);
  const isInCart = productsIdInCart.includes(product._id);
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const handleProductDetails = () => {
    setIsOpen(false);
    dispatch(setProductsDetails());
  };
  const handleSaveReview = () => {
    if (reviewRating === 0) {
      toast.error('You have to rate the product', {
        duration: 3000,
        style: toastStyles.ERROR,
      });
    }
    if (reviewMsg.trim().length < 3) {
      toast.error('You have to give your review', {
        duration: 3000,
        style: toastStyles.ERROR,
      });
    }
    const reviewRequirements = {
      userId: user?.id,
      productId: product?._id,
      userName: user?.userName,
      message: reviewMsg.trim(),
      rating: reviewRating,
    };
    dispatch(addProductReview(reviewRequirements)).then((action) => {
      const res = action.payload;
      console.log(res, 'productDetails');
      if (res.success) {
        toast('Your review is saved', {
          duration: 3000,
          style: toastStyles.SUCCESS,
        });
        dispatch(getAllProductReviews(product._id));
        dispatch(fetchProductDetails(product._id));
        setReviewMsg('');
        setReviewRating(0);
      } else {
        console.log(res.msg);
        toast.error(res.msg || 'Something went wrong', {
          duration: 3000,
          style: toastStyles.ERROR,
        });
      }
    });
  };
  useEffect(() => {
    dispatch(getAllProductReviews(product._id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProductDetails(product._id));
  }, [dispatch]);
  return (
    <Dialog open={isOpen} onOpenChange={handleProductDetails}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[50vw] !px-8 !py-5">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productImage}
            alt={productTitle}
            className="aspect-square w-full object-fill"
          />
          {product?.totalStock <= 10 && (
            <Badge
              className={`absolute top-2 right-2 ${
                product?.totalStock === 0
                  ? 'bg-red-500'
                  : product?.totalStock <= 5
                  ? 'bg-orange-500'
                  : 'bg-yellow-500'
              }`}
            >
              {product?.totalStock} out of stock
            </Badge>
          )}
          <div className="mt-4 flex gap-1">
            <ProductRating
              isReview={true}
              onRate={(ratingValue) => setReviewRating(ratingValue)}
            />
            <Input
              placeholder="write a review"
              value={reviewMsg}
              name="reviewMsg"
              onChange={(e) => setReviewMsg(e.target.value)}
            />
            <Button
              className="cursor-pointer w-[30px]"
              onClick={handleSaveReview}
            >
              <ArrowUpFromLine />
            </Button>
          </div>
        </div>
        <div className="">
          <div className="mb-3">
            <DialogTitle className="text-3xl font-extrabold">
              {productTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              {productDescription}
            </DialogDescription>
            <Separator />
          </div>
          <ProductPrice price={productPrice} salePrice={productSalePrice} />
          <div className="flex items-center gap-2 mt-[-8px]">
            <ProductRating rating={productAvgRating} />
            <span className="text-muted-foreground text-sm mb-0.5">
              ({productAvgRating}) - {productReviewsCount} reviews
            </span>
          </div>
          <div className="my-3">
            {product?.totalStock !== 0 ? (
              <Button
                className={`w-full ${
                  isInCart ? 'opacity-50' : 'cursor-pointer'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product?._id);
                }}
              >
                {isInCart ? 'Product in Cart' : 'Add to Cart'}
              </Button>
            ) : (
              <Button
                className={`w-full bg-red-400 hover:bg-red-500`}
                onClick={(e) => {
                  e.stopPropagation();
                  toast.error('Out of stock', {
                    style: toastStyles.ERROR,
                    duration: 3000,
                  });
                }}
              >
                Out of stock
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[200px] overflow-auto">
            <h3 className="text-xl font-bold mb-2">Reviews</h3>
            <div className="grid gap-2">
              {reviewsList?.length === 0 ? (
                <p className="text-muted-foreground font-semibold text-center opacity-80">
                  No Reviews yet for this product.
                </p>
              ) : (
                reviewsList.map((review, i) => (
                  <div
                    key={i}
                    className="flex items-center border rounded-lg px-2 py-1 mb-2"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-black text-white font-semibold">
                        {review?.userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Separator
                      orientation="vertical"
                      className="h-full ml-1 mr-3"
                    />
                    <div className="grid gap-1 w-full">
                      <div>
                        <h4 className="font-semibold">{review?.userName}</h4>
                        <ProductRating rating={review.rating} />
                      </div>
                      <div className="bg-muted border-muted-foreground p-1 rounded mt-2 flex justify-between">
                        <Quote className="rotate-180 w-2 h-2" />
                        <p className="text-muted-foreground text-sm">
                          {review?.message}
                        </p>
                        <Quote className="w-2 h-2" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
