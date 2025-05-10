import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  approvalURL: null,
  orderId: null,
  isLoading: false,
  orderList: [],
};

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverURL}/shop/order/create`,
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const captureOrder = createAsyncThunk(
  '/order/captureOrder',
  async ({ orderId, payerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${serverURL}/shop/order/capture`, {
        orderId,
        payerId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const getAllUserOrders = createAsyncThunk(
  '/shopOrders/getAllUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${serverURL}/shop/order/get/list/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);

const shopOrderSlice = createSlice({
  name: 'shopOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

export default shopOrderSlice.reducer;
