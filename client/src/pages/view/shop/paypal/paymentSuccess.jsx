import React from 'react';
import SuccessImage from '@/assets/status/paymentSuccess.svg';
import StatusPage from '@/components/common/statusPage';

export default function PaymentSuccess() {
  return (
    <StatusPage
      code={200}
      title="Payment Successful"
      message="Thank you for your purchase! Your payment has been processed successfully."
      image={SuccessImage}
      theme="green"
      homePath="/shop/home"
      showCode={false}
      btn1Path="/shop/home"
    />
  );
}
