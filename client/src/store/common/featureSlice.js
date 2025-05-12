import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isLoading: true,
  featureImgList: [],
};

export const addNewFeature = createAsyncThunk(
  '/commonFeature/addNewFeature',
  async (image, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${serverURL}/common/features/add`, {
        image,
      });
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const getAllFeatures = createAsyncThunk(
  '/commonFeature/getAllFeatures',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${serverURL}/common/features/getAll`);
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const deleteFeature = createAsyncThunk(
  'commonFeature/deleteFeature',
  async ({ imgId }, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${serverURL}/common/features/delete/${imgId}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeatures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFeatures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImgList = action.payload.data;
      })
      .addCase(getAllFeatures.rejected, (state) => {
        state.isLoading = false;
        state.featureImgList = [];
      });
  },
});
export default featureSlice.reducer;
