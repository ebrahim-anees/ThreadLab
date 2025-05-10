import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  '/shopCart/addToCart',
  async ({ userId, productId, quantity }) => {
    const result = await axios.post(`${serverURL}/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });
    return result.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  '/shopCart/fetchCartItems',
  async (userId) => {
    const result = await axios.get(`${serverURL}/shop/cart/getAll/${userId}`);
    return result.data;
  }
);
export const editCartItem = createAsyncThunk(
  '/shopCart/editCartItem',
  async ({ userId, productId, quantity }) => {
    const result = await axios.put(`${serverURL}/shop/cart/edit`, {
      userId,
      productId,
      quantity,
    });
    return result.data;
  }
);
export const deleteCartItem = createAsyncThunk(
  '/shopCart/deleteCartItem',
  async ({ userId, productId }) => {
    const result = await axios.delete(
      `${serverURL}/shop/cart/delete/${userId}/${productId}`
    );
    return result.data;
  }
);

const shopCartSlice = createSlice({
  name: 'shopCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(editCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(editCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shopCartSlice.reducer;
