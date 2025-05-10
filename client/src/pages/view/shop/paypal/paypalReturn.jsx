import { Card, CardTitle } from '@/components/ui/card';
import { captureOrder } from '@/store/shop/orderSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../loading';

export default function PaypalReturn() {
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(useLocation().search);
  const orderId = urlParams.get('token');
  const payerId = urlParams.get('PayerID');

  useEffect(() => {
    if (orderId && payerId) {
      dispatch(captureOrder({ orderId, payerId })).then((action) => {
        const res = action.payload;
        if (res.success) {
          window.location.href = '/shop/paymentSuccess';
        } else {
          window.location.href = `/shop/paymentFailed?errorMsg=${res.msg}`;
        }
      });
    }
  }, [orderId, payerId]);

  return <Loading />;
}
