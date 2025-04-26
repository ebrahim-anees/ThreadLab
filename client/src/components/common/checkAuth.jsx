import Loading from '@/pages/view/loading';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function CheckAuth({ children }) {
  const { isAuthenticated, user, hasCheckedAuthOnce } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  // if (!hasCheckedAuthOnce) return <Loading />;
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes('/login') ||
      location.pathname.includes('/register')
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes('/login') ||
      location.pathname.includes('/register'))
  ) {
    if (user?.role === 'admin') {
      // return <Navigate to="/admin/dashboard" />;
      return <Navigate to="/shop/listing" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== 'admin' &&
    location.pathname.includes('/admin')
  ) {
    return <Navigate to="/unauth" />;
  }

  // if (
  //   isAuthenticated &&
  //   user?.role === 'admin' &&
  //   location.pathname.includes('/shop')
  // ) {
  //   return <Navigate to="/admin/dashboard" />;
  // }

  return <>{children}</>;
}
