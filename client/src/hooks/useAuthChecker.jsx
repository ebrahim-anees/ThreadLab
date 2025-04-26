import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, setHasCheckedAuthOnce } from '../store/auth/authSlice';
import { toast } from 'sonner';
import { toastStyles } from '../utils/toastStyles';
import { useLocation } from 'react-router-dom';
import { isCookieExist } from './../lib/utils.js';
import axios from 'axios';

const useAuthChecker = (/*minutes*/) => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const { isAuthenticated, isLoading, hasCheckedAuthOnce } = useSelector(
    (state) => state.auth
  );
  const isCheckingRef = useRef(false);

  // Re-check every wanted minutes
  //   useEffect(() => {
  //     const checkAuthStatus = async () => {
  //       console.log('checking...')
  //       const checkAuthWithLock = async () => {
  //         // Skip if already checking
  //         if (isCheckingRef.current) return;

  //         isCheckingRef.current = true; // Lock
  //         try {
  //           console.log('Running auth check...');
  //           await dispatch(checkAuth()); // Your Redux thunk
  //         } catch (error) {
  //           console.error('Auth check failed:', error);
  //         } finally {
  //           isCheckingRef.current = false; // Release lock
  //         }
  //       };

  //       // Initial check on mount (if needed)
  //       if (!hasCheckedAuthOnce) {
  //         checkAuthWithLock();
  //       }

  //       // console.log('checking...');
  //       // console.log(await dispatch(checkAuth));
  //       // try {
  //       //   if (isCheckingRef.current) return;
  //       //   isCheckingRef.current = true;
  //       //   const tokenRes = await axios.get(
  //       //     `${import.meta.env.VITE_SERVER_URL}/auth/checkToken`,
  //       //     { withCredentials: true }
  //       //   );
  //       //   console.log(tokenRes.data);
  //       //   if (!tokenRes.data.success && !hasCheckedAuthOnce) {
  //       //     console.log('Dispatching checkAuth...');
  //       //     await dispatch(checkAuth()); // Your existing Redux action
  //       //   }
  //       // } catch (error) {
  //       //   console.error('Auth check failed:', error);
  //       //   if (!hasCheckedAuthOnce) {
  //       //     await dispatch(checkAuth()); // Fallback
  //       //   }
  //       // } finally {
  //       //   isCheckingRef.current = false;
  //       // }
  //     };
  //     checkAuthStatus();

  //     const interval = setInterval(checkAuthStatus, minutes * 60 * 1000);
  //     return () => clearInterval(interval);
  //   }, [dispatch, minutes, hasCheckedAuthOnce]);

  //   // Handle logout and redirect when session expires
  //   useEffect(() => {
  //     if (isAuthenticated === false && !isLoading) {
  //       toast.error('Session expired. Please log in again.', {
  //         duration: 3000,
  //         style: toastStyles.ERROR,
  //       });
  //     }
  //   }, [isAuthenticated, isLoading, path]);

  useEffect(() => {
    dispatch(checkAuth()); // Your Redux thunk
  }, [dispatch]);
};

export default useAuthChecker;
