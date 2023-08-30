import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEmailVerified: false,
  error: null,
};

const emailVerifySlice = createSlice({
  name: 'emailVerify',
  initialState,
  reducers: {
    setEmailVerified: (state) => {
      state.isEmailVerified = true;
      state.error = null; // Clear any previous errors when email is verified
    },
    setEmailVerificationError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEmailVerified, setEmailVerificationError } = emailVerifySlice.actions;

export default emailVerifySlice.reducer;
