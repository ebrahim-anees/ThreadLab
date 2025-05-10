import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  addressList: [],
  isLoading: false,
};

export const addAddress = createAsyncThunk(
  '/shopAddress/addAddress',
  async (formData) => {
    const result = await axios.post(
      `${serverURL}/shop/address/add`,
      formData
    );
    return result.data;
  }
);
export const fetchAllAddress = createAsyncThunk(
  'shopAddress/fetchAllAddress',
  async (userId) => {
    const result = await axios.get(
      `${serverURL}/shop/address/getAll/${userId}`
    );
    return result.data;
  }
);
export const editAddress = createAsyncThunk(
  'shopAddress/editAddress',
  async ({ userId, addressId, updatedData }) => {
    const result = await axios.put(
      `${
        serverURL
      }/shop/address/edit/${userId}/${addressId}`,
      updatedData
    );
    return result.data;
  }
);
export const deleteAddress = createAsyncThunk(
  'shopAddress/deleteAddress',
  async ({ userId, addressId }) => {
    const result = await axios.delete(
      `${
        serverURL
      }/shop/address/delete/${userId}/${addressId}`
    );
    return result.data;
  }
);

const shopAddressSlice = createSlice({
  name: 'shopAddress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default shopAddressSlice.reducer;
