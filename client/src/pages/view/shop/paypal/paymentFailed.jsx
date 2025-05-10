import { useLocation } from 'react-router-dom';
import React from 'react';
import FailedImage from '@/assets/status/paymentFailed.svg';
import StatusPage from '@/components/common/statusPage';

export default function PaymentFailed() {
  const urlParams = new URLSearchParams(useLocation().search);
  const errorMsg = urlParams.get('errorMsg');
  return (
    <StatusPage
      code={400}
      title="Payment Failed"
      message={decodeURIComponent(
        errorMsg || 'Something went wrong while processing your payment.'
      )}
      image={FailedImage}
      theme="yellow"
      homePath="/shop/cart"
      showCode={false}
      btn1Text="Go to Checkout"
      btn1Path="/shop/checkout"
    />
  );
}
