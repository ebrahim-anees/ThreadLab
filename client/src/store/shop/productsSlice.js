import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

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
      `${serverURL}/shop/products/getAllWithFilteration?${query}`
    );
    return result?.data;
  }
);
export const fetchProductDetails = createAsyncThunk(
  '/shopProducts/fetchProductDetails',
  async (id) => {
    const result = await axios.get(`${serverURL}/shop/products/get/${id}`);
    return result?.data;
  }
);

const shopProductsSlice = createSlice({
  name: 'shopProducts',
  initialState,
  reducers: {
    setProductsDetails: (state) => {
      state.productDetails = null;
    },
  },
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
      })
      .addCase('shopProducts/mergeSearchResults', (state, action) => {
        const newProducts = action.payload;
        const existingIds = new Set(state.productsList.map((p) => p._id));
        const uniqueProducts = newProducts.filter(
          (p) => !existingIds.has(p._id)
        );
        state.productsList = [...state.productsList, ...uniqueProducts];
      });
  },
});
export const { setProductsDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;
