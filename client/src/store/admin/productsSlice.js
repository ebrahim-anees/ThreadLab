import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isLoading: false,
  productsList: [],
};
export const addNewProduct = createAsyncThunk(
  '/adminProducts/addNewProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${serverURL}/admin/products/add`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || 'Failed to add new product'
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
export const editProduct = createAsyncThunk(
  'adminProducts/editProduct',
  async ({ id, formData }) => {
    const result = await axios.put(
      `${serverURL}/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (id) => {
    const result = await axios.delete(
      `${serverURL}/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      });
  },
});

export default adminProductsSlice.reducer;
