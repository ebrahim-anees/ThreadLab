import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isLoading: false,
  orderList: [],
};
export const getAllOrders = createAsyncThunk(
  '/adminOrders/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${serverURL}/admin/orders/getAll`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  'adminOrders/updateOrderStatus',
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${serverURL}/admin/orders/update/${orderId}`,
        { orderStatus }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { msg: 'Something went wrong' }
      );
    }
  }
);

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      });
  },
});

export default adminOrderSlice.reducer;
