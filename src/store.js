// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import authzReducer from './Slices/authzSlice';
import userReducer from './Slices/userSlice'
import forgotPasswordReducer from './Slices/forgotPasswordSlice';
import emailVerifyReducer from './Slices/emailVerifySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    authz: authzReducer,
    forgotPassword: forgotPasswordReducer,
    user: userReducer,
    emailVerify: emailVerifyReducer,
   
  },
});

export default store;
