// UnAuth.jsx
import React from 'react';
import UnAuthImage from '@/assets/status/unAuth.png';
import StatusPage from '@/components/common/statusPage';

export default function UnAuth() {
  return (
    <StatusPage
      code={401}
      title="Oops! Unauthorized Access"
      message="You don't have permission to view this page. Please contact support if you believe this is a mistake."
      image={UnAuthImage}
      theme="red"
      btn1Path="/auth/login"
      btn1Text="Login"
      btn2Path="/auth/register"
      btn2Text="Register"
    />
  );
}
