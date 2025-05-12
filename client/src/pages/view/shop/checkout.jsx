import accountImg from '@/assets/account.jpg';
import CalcTotal from '@/components/view/shop/cart/calcTotal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Address from '@/components/view/shop/account/address';
import CartItemContent from '@/components/view/shop/cart/cartItemContent';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalItemsPrice } from '@/utils/funcs/calcTotalItemsPrice';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { toastStyles } from '@/utils/toastStyles';
import { createNewOrder } from '@/store/shop/orderSlice';
export default function ShoppingCheckout() {
  const [curSelectedAddress, setCurSelectedAddress] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const itemsInCart = cartItems.items;
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();
  const handlePaypalPayment = () => {
    if (curSelectedAddress) {
      setIsPaymentLoading(true);
      const orderData = {
        userId: user?.id,
        cartId: cartItems?._id,
        cartItems: itemsInCart.map((item) => ({
          productId: item?.productId,
          title: item?.title,
          image: item?.image,
          price: item?.salePrice > 0 ? item.salePrice : item.price,
          quantity: item?.quantity,
        })),
        addressInfo: {
          addressId: curSelectedAddress._id,
          address: curSelectedAddress.address,
          city: curSelectedAddress.city,
          pincode: curSelectedAddress.pincode,
          phone: curSelectedAddress.phone,
          notes: curSelectedAddress.notes,
        },
        totalAmount: calculateTotalItemsPrice(itemsInCart),
        orderUpdateDate: new Date(),
        paymentId: '',
        payerId: '',
      };
      dispatch(createNewOrder(orderData)).then((action) => {
        const res = action.payload;
        setIsPaymentLoading(false);
        if (res.success) {
        } else {
          toast.error('Failed complete the checkout', {
            duration: 3000,
            style: toastStyles.ERROR,
          });
        }
      });
    } else {
      toast.error('You should select One of your addresses', {
        duration: 3000,
        style: toastStyles.ERROR,
      });
    }
  };

  useEffect(() => {
    if (approvalURL) window.location.href = approvalURL;
  }, [approvalURL]);
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="account-image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-5 p-5">
        <Address
          curSelectedAddress={curSelectedAddress}
          setCurSelectedAddress={setCurSelectedAddress}
        />
        <Card className="flex flex-col gap-0.5 p-3">
          {itemsInCart?.length > 0 ? (
            <>
              {itemsInCart.map((cartItem) => (
                <CartItemContent key={cartItem.title} item={cartItem} />
              ))}
              <CalcTotal items={itemsInCart} />
              <Button
                className={`w-3/4 mx-auto ${
                  isPaymentLoading ? 'opacity-40' : 'cursor-pointer'
                }`}
                onClick={!isPaymentLoading ? () => handlePaypalPayment() : null}
              >
                {!isPaymentLoading ? 'Checkout with Paypal' : 'loading...'}
              </Button>
            </>
          ) : (
            <p className="text-center text-muted-foreground mt-4">
              Your cart is empty
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
