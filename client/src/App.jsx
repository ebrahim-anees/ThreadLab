import {
  Routes,
  Route as URL,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/view/admin/common/layout';
import AdminDashboard from './pages/view/admin/dashboard';
import AdminOrders from './pages/view/admin/orders';
import AdminFeatures from './pages/view/admin/features';
import ShoppingLayout from './components/view/shop/layout';
import NotFound from './pages/error/notFound';
import AdminProducts from './pages/view/admin/products';
import ShoppingAccount from './pages/view/shop/account';
import ShoppingCheckout from './pages/view/shop/checkout';
import ShoppingHome from './pages/view/shop/home';
import ShoppingListing from './pages/view/shop/listing';
import CheckAuth from './components/common/checkAuth';
import UnAuth from './pages/error/UnAuth';
import { useSelector } from 'react-redux';
import useAuthChecker from './hooks/useAuthChecker';
import Loading from './pages/view/loading';
import PaypalReturn from './pages/view/shop/paypal/paypalReturn';
import PaypalCancel from './pages/view/shop/paypal/paypalCancel';
import PaymentSuccess from './pages/view/shop/paypal/paymentSuccess';
import PaymentFailed from './pages/view/shop/paypal/paymentFailed';
import ShoppingSearch from './pages/view/shop/search';

export default function App() {
  const { isLoading, hasCheckedAuthOnce, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useAuthChecker(/*0.2*/);

  // if (!hasCheckedAuthOnce) return <Loading />;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <URL
          path="/auth"
          element={
            <CheckAuth>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <URL path="login" element={<AuthLogin />} />
          <URL path="register" element={<AuthRegister />} />
        </URL>
        <URL
          path="/admin"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <URL path="dashboard" element={<AdminDashboard />} />
          <URL path="features" element={<AdminFeatures />} />
          <URL path="orders" element={<AdminOrders />} />
          <URL path="products" element={<AdminProducts />} />
        </URL>
        <URL
          path="/shop"
          element={
            <CheckAuth>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <URL path="account" element={<ShoppingAccount />} />
          <URL path="checkout" element={<ShoppingCheckout />} />
          <URL path="home" element={<ShoppingHome />} />
          <URL path="listing" element={<ShoppingListing />} />
          <URL path="search" element={<ShoppingSearch/>} />
          <URL path="paypal">
            <URL path="return" element={<PaypalReturn />} />
            <URL path="cancel" element={<PaypalCancel />} />
          </URL>
          <URL path="paymentSuccess" element={<PaymentSuccess />} />
          <URL path="paymentFailed" element={<PaymentFailed />} />
        </URL>
        <URL path="*" element={<NotFound />} />
        <URL path="/unauth" element={<UnAuth />} />
      </Routes>
    </div>
  );
}
