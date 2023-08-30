// src/slices/authzSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authzSlice = createSlice({
  name: 'authz',
  initialState: {
    roles: [], // User roles
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
  },
});

export const { setRoles } = authzSlice.actions;
export const selectRoles = (state) => state.authz.roles;
export default authzSlice.reducer;
