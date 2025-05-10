import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchProducts = createAsyncThunk(
  'search/getProducts',
  async (searchPattern, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverURL}/shop/search/${searchPattern}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const fetchAllProducts = createAsyncThunk(
  '/adminProducts/fetchAllProducts',
  async () => {
    const result = await axios.get(`${serverURL}/admin/products/getAll`);
    return result?.data;
  }
);

const shopSearchSlice = createSlice({
  name: 'shopSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export default shopSearchSlice.reducer;
