import { calculateTotalItemsPrice } from '@/utils/funcs/calcTotalItemsPrice';
import { useMemo } from 'react';

export default function CalcTotal({ items }) {
  const totalItemsPrice = useMemo(
    () => calculateTotalItemsPrice(items),
    [items]
  );
  return (
    <div className="flex justify-between font-extrabold mb-4 mx-2">
      <span className="">Total</span>
      <span className="">${totalItemsPrice}</span>
    </div>
  );
}
