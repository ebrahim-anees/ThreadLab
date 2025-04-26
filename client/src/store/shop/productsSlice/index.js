import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};

export const fetchAllProductsWithFilteration = createAsyncThunk(
  '/shopProducts/fetchAllProductsWithFilteration',
  async ({ filterParams, sortParam }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParam,
    });
    const result = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/shop/products/getAllWithFilteration?${query}`
    );
    return result?.data;
  }
);
export const fetchProductDetails = createAsyncThunk(
  '/shopProducts/fetchProductDetails',
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shopProductsSlice = createSlice({
  name: 'shopProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsWithFilteration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProductsWithFilteration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(fetchAllProductsWithFilteration.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductsSlice.reducer;
