import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isLoading: false,
  reviewsList: [],
};

export const addProductReview = createAsyncThunk(
  'productReviews/addProductReview',
  async (reviewRequirements, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverURL}/shop/review/add`, {
        reviewRequirements,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const getAllProductReviews = createAsyncThunk(
  '/productReviews/getAllProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverURL}/shop/review/getAll/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
      s;
    }
  }
);

const productReviewSlice = createSlice({
  name: 'productReview',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewsList = action.payload.data;
      })
      .addCase(getAllProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviewsList = [];
      });
  },
});

export default productReviewSlice.reducer;
