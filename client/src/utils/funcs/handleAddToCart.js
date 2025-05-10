import { toast } from 'sonner';
import { toastStyles } from '../toastStyles';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';

export const handleAdding = (dispatch, productId, productsIdInCart, user) => {
  const isInCart = productsIdInCart.includes(productId);
  if (isInCart) {
    toast.error('Product is in cart', {
      duration: 3000,
      style: toastStyles.ERROR,
    });
  } else {
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (action) => {
        const res = action.payload;
        if (res?.success) {
          toast('Product added to cart', {
            duration: 3000,
            style: toastStyles.SUCCESS,
          });
          dispatch(fetchCartItems(user?.id));
        } else {
          toast.error(res?.msg || 'Failed add to cart', {
            duration: 3000,
            style: toastStyles.ERROR,
          });
        }
      }
    );
  }
};
