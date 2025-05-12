import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import adminProductsReducer from './admin/productsSlice';
import adminOrderReducer from './admin/orderSlice';
import shopProductsReducer from './shop/productsSlice';
import shopCartReducer from './shop/cartSlice';
import shopAddressReducer from './shop/addressSlice';
import shopOrderReducer from './shop/orderSlice';
import shopSearchReducer from './shop/searchSlice';
import productReviewReducer from './shop/reviewSlice';
import featureReducer from './common/featureSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    adminOrder: adminOrderReducer,
    shopProducts: shopProductsReducer,
    shopCart: shopCartReducer,
    shopAddress: shopAddressReducer,
    shopOrder: shopOrderReducer,
    shopSearch: shopSearchReducer,
    productReview: productReviewReducer,
    feature: featureReducer,
  },
});

export default store;
