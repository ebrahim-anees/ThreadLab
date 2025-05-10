import React from 'react';
import NotFoundImage from '@/assets/status/pageNotFound.png';
import { useSelector } from 'react-redux';
import StatusPage from '@/components/common/statusPage';

export default function NotFound() {
  const { user } = useSelector((state) => state.auth);
  const homePath = user?.role === 'admin' ? '/admin/dashboard' : '/shop/home';

  return (
    <StatusPage
      code={404}
      title="Oops! Page Not Found"
      message="We couldn't find what you're looking for. Please check the URL."
      image={NotFoundImage}
      theme="blue"
      btn1Path={homePath}
    />
  );
}
