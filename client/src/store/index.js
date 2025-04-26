import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import adminProductsReducer from './admin/productsSlice';
import shopProductsReducer from './shop/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shopProductsReducer,
  },
});

export default store;
