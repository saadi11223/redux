import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUserDataStart: (state) => {
      state.loading = true;
    },
    fetchUserDataSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    fetchUserDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createUserSuccess: (state) => {
      
    },
    createUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  createUserSuccess,
  createUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
