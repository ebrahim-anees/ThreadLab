import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { deleteCartItem, editCartItem } from '@/store/shop/cartSlice';
import { fetchProductDetails } from '@/store/shop/productsSlice';
import { toastStyles } from '@/utils/toastStyles';
import { Minus, Plus, Trash } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function CartItemContent({ item }) {
  const { image, title, price, salePrice, quantity, productId } = item;
  const { user } = useSelector((state) => state.auth);
  const productDetails = useSelector(
    (state) => state.shopProducts
  ).productDetails;
  const dispatch = useDispatch();
  const itemTotalPrice = useMemo(
    () => (salePrice > 0 ? salePrice : price) * quantity,
    [price, quantity, salePrice]
  );
  const handleDeleteCartItem = () => {
    dispatch(deleteCartItem({ userId: user.id, productId }));
  };
  const handleUpdateCartItem = (operation) => {
    let quantityCpy = quantity;
    if (operation === '+') {
      if (++quantityCpy <= productDetails?.totalStock) {
        dispatch(
          editCartItem({
            userId: user.id,
            productId,
            quantity: quantityCpy,
          })
        ).then((action) => {
          const res = action.payload;
          if (res.success) {
            toast(`${title} quantity is added`, {
              duration: 3000,
              style: toastStyles.SUCCESS,
            });
          } else {
            toast.error(`adding ${title} quantity is failed`, {
              duration: 3000,
              style: toastStyles.ERROR,
            });
          }
        });
      } else {
        toast.error(
          `Only ${productDetails?.totalStock} stock still in the storage`,
          {
            duration: 3000,
            style: toastStyles.ERROR,
          }
        );
      }
    } else {
      dispatch(
        editCartItem({
          userId: user.id,
          productId,
          quantity: --quantityCpy,
        })
      ).then((action) => {
        const res = action.payload;
        if (res.success) {
          toast(`${title} quantity is decreased`, {
            duration: 3000,
            style: toastStyles.SUCCESS,
          });
        } else {
          toast.error(`Decrease ${title} quantity is failed`, {
            duration: 3000,
            style: toastStyles.ERROR,
          });
        }
      });
    }
  };
  useEffect(() => {
    dispatch(fetchProductDetails(item.productId));
  }, [dispatch]);
  return (
    <>
      <div className="flex items-center space-x-4 bg-muted rounded-lg p-3">
        <img src={image} alt={title} className="w-20 h-20 rounded object-fit" />
        <div className="flex-1">
          <h4 className="font-bold">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="icon"
              disabled={quantity === 1}
              className={`h-8 w-8 rounded-full cursor-pointer ${
                quantity === 1 ? '!opacity-40' : ''
              }`}
              onClick={() => handleUpdateCartItem('-')}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-semibold"> {quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full cursor-pointer"
              onClick={() => handleUpdateCartItem('+')}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-bold">${itemTotalPrice.toFixed(2)}</p>
          <Trash
            className="text-red-800 cursor-pointer"
            size={20}
            onClick={() => handleDeleteCartItem()}
          />
        </div>
      </div>
      <Separator className="my-3" />
    </>
  );
}
