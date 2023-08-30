// forgotPasswordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendResetPasswordRequest = createAsyncThunk(
  'forgotPassword/sendResetRequest',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      return true; // Reset request sent successfully
    } catch (error) {
      return rejectWithValue('An error occurred while sending the reset request.');
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResetPasswordRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendResetPasswordRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendResetPasswordRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Reset request failed.';
      });
  },
});

export default forgotPasswordSlice.reducer;
