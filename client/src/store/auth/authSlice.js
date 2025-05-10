import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  // hasCheckedAuthOnce: false,
};

///  helps you create asynchronous actions (e.g., API requests) and automatically handles their lifecycle
/// createAsyncThunk(actionType, asyncFunction)
/// createAsyncThunk generates an action creator with three types of actions: registerUser.pending - registerUser.fulfilled - registerUser.rejected
export const registerUser = createAsyncThunk(
  /// a custom string (sliceName/actionName)
  'auth/register',
  async (registerFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${serverURL}/auth/register`,
        registerFormData,
        { withCredentials: true } /// Allows cookies
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${serverURL}/auth/login`, loginFormData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${serverURL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${serverURL}/auth/checkAuth`, {
        withCredentials: true,
        headers: {
          'Cache-Control':
            'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setHasCheckedAuthOnce: (state, action) => {
      state.hasCheckedAuthOnce = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        // state.hasCheckedAuthOnce = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        // state.hasCheckedAuthOnce = true;
      });
  },
});
export const { setHasCheckedAuthOnce } = authSlice.actions;

// export const { setUser } = authSlice.actions;
/// Used in your React components to trigger a change in the Redux state.
/// It doesn’t directly change the state — it just sends an action object like this to the store:
/// { type: 'auth/setUser', payload: { name: 'Ebrahim' } }

export default authSlice.reducer;
/// Used in store.js
/// This is the function that actually updates the state when it receives an action.
/// It "listens" for actions like 'auth/setUser' and updates the corresponding part of the state.

// -------------------------------------------
/// action: It describes what just happened (e.g., an API call started, succeeded, or failed).
/// {
///   type: 'user/fetchUser/rejected',
///   payload: 'Something went wrong',   // <- comes from rejectWithValue()
///   error: {                           // <- in case of not using rejectWithValue()
///     message: 'Rejected',
///     name: 'Error'
///   },
///   meta: {
///     arg: undefined,
///     requestId: 'abcd-123',
///     requestStatus: 'rejected'
///   }
/// }
