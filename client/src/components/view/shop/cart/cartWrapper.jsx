import { Button } from '@/components/ui/button';
import CartItemContent from './cartItemContent';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalcTotal from '@/components/view/shop/cart/calcTotal';

export default function CartWrapper({ cartItems, setIsCartOpen }) {
  const { items } = cartItems;
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate('/shop/checkout');
    setIsCartOpen(false);
  };

  return (
    <div className="px-5">
      <CalcTotal items={items} />
      <div className="space-y-4">
        {items?.length > 0 ? (
          items.map((item) => (
            <CartItemContent key={item.productId} item={item} />
          ))
        ) : (
          <p className="text-center text-muted-foreground mt-4">
            Your cart is empty
          </p>
        )}
      </div>
      <Button className="w-full mt-4 cursor-pointer" onClick={handleCheckOut}>
        CheckOut
      </Button>
    </div>
  );
}
